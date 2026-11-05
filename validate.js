#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoPath = __dirname;
const listPath = path.join(repoPath, "bifrost-wallet.providerlist.json");
const schemaPath = path.join(repoPath, "providerlist.schema.json");

const CHAIN_IDS = new Set([19, 14]);
const NAME_PATTERN = /^[ \w.'+\-%/À-ÖØ-öø-ÿ:&\[\]\(\)]+$/;
const DESCRIPTION_PATTERN = /^[ \w.'+\-%/À-ÖØ-öø-ÿ:&\[\]\(\)]+/;
const URL_PATTERN = /^https:\/\/[A-Za-z0-9\/#.-]*[^/]$/;
const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const LOGO_URI_PATTERN = /^https:\/\/raw\.githubusercontent\.com\/TowoLabs\/ftso-signal-providers\/master\/assets\/(0x[a-fA-F0-9]{40})\.png$/;
const LIST_NAME_PATTERN = /^[A-Za-z ]+$/;
const DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

const listBuffer = fs.readFileSync(listPath);
const listString = listBuffer.toString("utf-8");

const root = {};
function isUnique(provider, propertyName) {
  const chainId = provider.chainId;
  const propertyValue = provider[propertyName];
  const forChainId = root[chainId] = root[chainId] || {};
  const knownValues = forChainId[propertyName] = forChainId[propertyName] || new Set();
  if (knownValues.has(propertyValue)) {
    throw new Error(`Property ${propertyName} is not unique, ${propertyValue} already exists for chain ID ${chainId}`);
  }

  knownValues.add(propertyValue);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertInteger(value, label) {
  assert(Number.isInteger(value), `${label} must be an integer`);
}

function assertString(value, label) {
  assert(typeof value === "string", `${label} must be a string`);
}

function assertNoExtraKeys(object, allowed, label) {
  for (const key of Object.keys(object)) {
    assert(allowed.has(key), `${label} has unexpected property "${key}"`);
  }
}

/** Keccak-256 (Ethereum) — compact pure-JS implementation for EIP-55. */
function keccak256(message) {
  const RC = [
    0x0000000000000001n, 0x0000000000008082n, 0x800000000000808an, 0x8000000080008000n,
    0x000000000000808bn, 0x0000000080000001n, 0x8000000080008081n, 0x8000000000008009n,
    0x000000000000008an, 0x0000000000000088n, 0x0000000080008009n, 0x000000008000000an,
    0x000000008000808bn, 0x800000000000008bn, 0x8000000000008089n, 0x8000000000008003n,
    0x8000000000008002n, 0x8000000000000080n, 0x000000000000800an, 0x800000008000000an,
    0x8000000080008081n, 0x8000000000008080n, 0x0000000080000001n, 0x8000000080008008n,
  ];
  const ROTC = [0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14];
  const PILN = [0, 10, 20, 5, 15, 16, 1, 11, 21, 6, 7, 17, 2, 12, 22, 23, 8, 18, 3, 13, 14, 24, 9, 19, 4];
  const MASK = 0xffffffffffffffffn;
  const rotl = (v, r) => {
    r = BigInt(r);
    return r === 0n ? (v & MASK) : (((v << r) | (v >> (64n - r))) & MASK);
  };

  const state = new BigUint64Array(25);
  const bytes = Buffer.from(message);
  const rate = 136;

  const permute = () => {
    for (let round = 0; round < 24; round++) {
      const C = new BigUint64Array(5);
      for (let x = 0; x < 5; x++) {
        C[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20];
      }
      for (let x = 0; x < 5; x++) {
        const D = C[(x + 4) % 5] ^ rotl(C[(x + 1) % 5], 1);
        for (let y = 0; y < 25; y += 5) {
          state[y + x] ^= D;
        }
      }

      const B = new BigUint64Array(25);
      for (let i = 0; i < 25; i++) {
        B[PILN[i]] = rotl(state[i], ROTC[i]);
      }

      for (let y = 0; y < 25; y += 5) {
        for (let x = 0; x < 5; x++) {
          state[y + x] = B[y + x] ^ ((~B[y + ((x + 1) % 5)]) & B[y + ((x + 2) % 5)]);
        }
      }

      state[0] ^= RC[round];
    }
  };

  let offset = 0;
  while (offset + rate <= bytes.length) {
    for (let i = 0; i < rate / 8; i++) {
      state[i] ^= bytes.readBigUInt64LE(offset + i * 8);
    }
    permute();
    offset += rate;
  }

  const last = Buffer.alloc(rate);
  bytes.copy(last, 0, offset);
  last[bytes.length - offset] ^= 0x01;
  last[rate - 1] ^= 0x80;
  for (let i = 0; i < rate / 8; i++) {
    state[i] ^= last.readBigUInt64LE(i * 8);
  }
  permute();

  const out = Buffer.alloc(32);
  for (let i = 0; i < 4; i++) {
    out.writeBigUInt64LE(state[i], i * 8);
  }
  return out;
}

function checkAddressChecksum(address) {
  if (!ADDRESS_PATTERN.test(address)) {
    return false;
  }

  const bare = address.slice(2);
  const hash = keccak256(bare.toLowerCase()).toString("hex");
  for (let i = 0; i < 40; i++) {
    const hashByte = parseInt(hash[i], 16);
    const char = bare[i];
    if (hashByte > 7) {
      if (char !== char.toUpperCase()) {
        return false;
      }
    } else if (char !== char.toLowerCase()) {
      return false;
    }
  }
  return true;
}

function validateVersion(version) {
  assert(version && typeof version === "object" && !Array.isArray(version), "version must be an object");
  assertNoExtraKeys(version, new Set(["major", "minor", "patch"]), "version");
  for (const key of ["major", "minor", "patch"]) {
    assert(key in version, `version.${key} is required`);
    assertInteger(version[key], `version.${key}`);
    assert(version[key] >= 0, `version.${key} must be >= 0`);
  }
}

function validateProvider(provider, index) {
  const label = `providers[${index}]`;
  assert(provider && typeof provider === "object" && !Array.isArray(provider), `${label} must be an object`);
  assertNoExtraKeys(
    provider,
    new Set(["chainId", "name", "description", "url", "address", "logoURI", "listed"]),
    label,
  );

  for (const key of ["chainId", "name", "description", "url", "address", "logoURI"]) {
    assert(key in provider, `${label}.${key} is required`);
  }

  assertInteger(provider.chainId, `${label}.chainId`);
  assert(CHAIN_IDS.has(provider.chainId), `${label}.chainId must be one of ${[...CHAIN_IDS].join(", ")}`);

  assertString(provider.name, `${label}.name`);
  assert(provider.name.length >= 2 && provider.name.length <= 32, `${label}.name length must be 2-32`);
  assert(NAME_PATTERN.test(provider.name), `${label}.name has invalid characters`);

  assertString(provider.description, `${label}.description`);
  assert(
    provider.description.length >= 10 && provider.description.length <= 350,
    `${label}.description length must be 10-350`,
  );
  assert(DESCRIPTION_PATTERN.test(provider.description), `${label}.description has invalid characters`);

  assertString(provider.url, `${label}.url`);
  assert(provider.url.length <= 100, `${label}.url length must be <= 100`);
  assert(URL_PATTERN.test(provider.url), `${label}.url must be an https URL without a trailing slash`);

  assertString(provider.address, `${label}.address`);
  assert(ADDRESS_PATTERN.test(provider.address), `${label}.address must be a 40-char hex address`);

  assertString(provider.logoURI, `${label}.logoURI`);
  assert(LOGO_URI_PATTERN.test(provider.logoURI), `${label}.logoURI must match the expected raw GitHub asset URL`);

  if ("listed" in provider) {
    assert(typeof provider.listed === "boolean", `${label}.listed must be a boolean`);
  }
}

function validateList(list) {
  assert(list && typeof list === "object" && !Array.isArray(list), "list must be an object");
  assertNoExtraKeys(
    list,
    new Set(["name", "description", "keywords", "timestamp", "version", "providers"]),
    "list",
  );

  for (const key of ["name", "timestamp", "version", "providers"]) {
    assert(key in list, `${key} is required`);
  }

  assertString(list.name, "name");
  assert(list.name.length >= 1 && list.name.length <= 48, "name length must be 1-48");
  assert(LIST_NAME_PATTERN.test(list.name), "name has invalid characters");

  if ("description" in list) {
    assertString(list.description, "description");
    assert(
      list.description.length >= 10 && list.description.length <= 500,
      "description length must be 10-500",
    );
  }

  if ("keywords" in list) {
    assert(Array.isArray(list.keywords), "keywords must be an array");
    assert(list.keywords.length >= 1 && list.keywords.length <= 32, "keywords length must be 1-32");
    const seenKeywords = new Set();
    list.keywords.forEach((keyword, index) => {
      assertString(keyword, `keywords[${index}]`);
      assert(keyword.length >= 1 && keyword.length <= 32, `keywords[${index}] length must be 1-32`);
      assert(/^[a-z0-9-]+$/.test(keyword), `keywords[${index}] must be lowercase alphanumeric or hyphen`);
      assert(!seenKeywords.has(keyword), `keywords contains a duplicate item: ${keyword}`);
      seenKeywords.add(keyword);
    });
  }

  assertString(list.timestamp, "timestamp");
  assert(DATE_TIME_PATTERN.test(list.timestamp), "timestamp must be an ISO-8601 date-time");
  assert(!Number.isNaN(Date.parse(list.timestamp)), "timestamp must be a valid date-time");

  validateVersion(list.version);

  assert(Array.isArray(list.providers), "providers must be an array");
  assert(list.providers.length >= 1 && list.providers.length <= 10000, "providers length must be 1-10000");

  const seen = new Set();
  list.providers.forEach((provider, index) => {
    const serialized = JSON.stringify(provider);
    assert(!seen.has(serialized), `providers contains a duplicate item at index ${index}`);
    seen.add(serialized);
    validateProvider(provider, index);
  });
}

// Schema remains for documentation / external consumers; rules are enforced below.
assert(fs.existsSync(schemaPath), `Missing schema at ${schemaPath}`);

let listContent;
try {
  listContent = JSON.parse(listString);
} catch (error) {
  throw new Error(`List content could not be parsed (${error.message})`);
}

if (JSON.stringify(listContent, null, 2) + "\n" !== listString) {
  throw new Error("List content is malformed, indent using 2 spaces, run the linter");
}

validateList(listContent);

listContent.providers.forEach(provider => {
  if (!checkAddressChecksum(provider.address)) {
    throw new Error(`Invalid checksum for address: ${provider.address}`);
  }

  const logoFileName = provider.logoURI.match(LOGO_URI_PATTERN)[1];
  if (logoFileName !== provider.address) {
    throw new Error(`Logo file name mismatch, expected ${provider.address}, received ${logoFileName}`);
  }

  const exists = fs.existsSync(path.join(repoPath, "assets", `${provider.address}.png`));
  if (!exists) {
    throw new Error(`Could not find logo for ${provider.address}`);
  }

  isUnique(provider, "name");
  isUnique(provider, "description");
  isUnique(provider, "url");
  isUnique(provider, "address");
  isUnique(provider, "logoURI");
});

console.log(`OK — validated ${listContent.providers.length} providers`);
