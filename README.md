# FTSO Signal Providers

This repository was [Bifrost Wallet](https://bifrostwallet.com)’s FTSO provider list for Flare and Songbird. This snapshot is deprecated and is not production-ready. A frontend should not consume its JSON, or its logos, directly from GitHub.

The maintained catalog is [`@bifrostwallet/assets`](https://www.npmjs.com/package/@bifrostwallet/assets), a zero-dependency package of the curated assets Bifrost Wallet ships: FTSO data providers, validators, tokens, contracts, and dapps. [Consuming Assets](https://docs.bifrostwallet.com/list/consuming-assets) is the guide for installing it, hosting logos on your own CDN or backend, comparing logo hashes, and checking that providers have signed their entries. Apply those checks according to your security requirements.

## What `listed: true` means

`listed: true` is a quality stamp Bifrost Wallet awards to providers who actively support the Flare and Songbird networks. It is awarded at the discretion of the Bifrost Wallet team. A submission, a pull request, or time spent waiting does not create a right to be listed.

The bar is there so wallet users do not lose rewards, and so the networks stay protected from malicious actors, colluding actors, and unreliable actors. Providers we list are expected to be active and earning rewards, with sound uptime, a good reputation, a public presence, a few months of on-chain history, a sizeable self-bond, a real set of stakers, and vote power from the community.

Anyone using this archived list can apply their own quality bar and decide for themselves what deserves `listed: true`. Bifrost Wallet’s flag is our standard for our users. It is not a neutral ranking, and it is not an obligation to list every provider that asked.

## Contents

* `bifrost-wallet.providerlist.json` — the frozen provider list
* `assets/` — historical PNG logos, named by delegation address
* `providerlist.schema.json` — JSON Schema for the list
* `validate.js` — checks formatting, schema rules, EIP-55 checksums, and local logo files

Only Songbird (`chainId` 19) and Flare (`chainId` 14) are included. Every `logoURI` points at a PNG in this repository, named by delegation address, so the archive stays self-contained.

## Record format

These are the constraints the frozen records follow. `providerlist.schema.json` is the machine-readable copy. This section documents the archive. It is not an application form.

* `chainId` is `19` (Songbird) or `14` (Flare)
* Text fields are ASCII
* `name` is 2–32 characters
* `description` is 10–350 characters
* `url` is at most 100 characters, uses `https://`, and has no trailing slash
* `address` is the delegation address (not the identity address), 40 hex characters, EIP-55 checksummed
* `logoURI` ends with that same checksummed address and `.png`
* The logo file is a square PNG in `assets/`, 128–256 px on each side, at most 24 KB, with the mark centered and a background that is either transparent or full-bleed

## License

[CC0 1.0](LICENSE). This snapshot is dedicated to the public domain.

## Validate the snapshot

Requires Node.js 26 or newer.

```sh
npm test
```

A passing run prints `OK — validated N providers`.
