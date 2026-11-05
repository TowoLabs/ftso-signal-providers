# FTSO Signal Providers

This repository was Bifrost Wallet’s own provider list. It maps Flare and Songbird FTSO signal provider addresses to names, descriptions, websites, and logos so the wallet can show them. It was actively maintained through early 2026. From then on, [`bifrostwallet/assets`](https://github.com/bifrostwallet/assets) is the only actively maintained catalog, and the only one we recommend.

This snapshot is frozen. It was built for Bifrost Wallet, and it is not a general-purpose feed meant to be consumed as-is. If you need a maintained provider list, switch to [`@bifrostwallet/assets`](https://www.npmjs.com/package/@bifrostwallet/assets). Integrator guide: [Consuming Assets](https://docs.bifrostwallet.com/list/consuming-assets).

## What `listed: true` means

`listed: true` is a quality stamp Bifrost Wallet awards to providers who actively support the Flare and Songbird networks. It is awarded at the discretion of the Bifrost Wallet team. A submission, a pull request, or time spent waiting does not create a right to be listed.

The bar is there so wallet users do not lose rewards, and so the networks stay protected from malicious actors, colluding actors, and unreliable actors. Providers we list are expected to be active and earning rewards, with sound uptime, a good reputation, a public presence, a few months of on-chain history, a sizeable self-bond, a real set of stakers, and vote power from the community.

Anyone using this archived list can apply their own quality bar and decide for themselves what deserves `listed: true`. Bifrost Wallet’s flag is our standard for our users. It is not a neutral ranking, and it is not an obligation to list every provider that asked.

## Use the maintained catalog

Install `@bifrostwallet/assets`. It has no runtime dependencies. Host the logos on your own CDN or backend. `logoURL` in the package defaults to GitHub raw URLs; rewrite them to your origin before serving them to users. GitHub’s CDN is a fallback for this snapshot, not a production image host.

In a provider picker, show only `listed: true` (`getListedProviders`). After a user has already chosen a provider, show that provider even when `listed` is false (`getProvider`).

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
