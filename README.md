# Flare Time Series Oracle Signal Providers
Anyone operating an FTSO signal provider, passing all tests and fulfilling all requirements, may submit a pull request to this repository. We may require you to prove ownership of your website and on-chain address before accepting your contribution.

The purpose of `bifrost-wallet.providerlist.json` is to map on-chain signal provider addresses to their logos, names, descriptions and websites. It may be referenced by wallets, dapps and other applications in need of signal provider logos and metadata. Inactive, underperforming or misbehaving signal providers will be denied and removed.

## How to Add Your Signal Provider
1. Read the [Requirements](#requirements-naming)
2. Fork the repository and run `yarn install`
3. Copy an existing provider entry in `bifrost-wallet.providerlist.json`
4. Fill your details and add your entry to the bottom of the list
5. Add your logo to `assets/` and make sure it's named correctly
6. Run `yarn test` and make sure all tests pass
7. Submit a pull request to the `next` branch

## Requirements
* `chainId` must be either `19` (Songbird), `14` (Flare), `16` (Coston) or `114` (Coston2)
* All attributes are required and must be in ASCII
* `name` may be max 32 characters
* `description` may be max 350 characters
    * Must describe your service, values or unique selling points
    * Must be spellchecked
* `url` may be max 100 characters
    * Must be prefixed with https://
    * Must redirect HTTP to HTTPS
* `address` must be 40 characters hex
    * Must be EIP-55 checksummed
    * Must be actively and successfully submitting prices
* `logoURI` must be this repository's raw GitHub user content path
  * Must end with your checksummed address and a `.png` file extension
  * Must fulfill the [PNG image requirements](#png-image-requirements)

### PNG Image Requirements
* The aspect ratio must be 1, use the same width and height
* The width and height must be between 128 px and 256 px
* The background must be transparent or fill the entire image
* The image content must be centered horizontally and vertically
* The image must be optimized, using for example: https://tinypng.com
* The maximum image filesize is 24 KB

### Example for Songbird and Flare

```json
{
  "chainId": 19,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 350 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x69141E890F3a79cd2CFf552c0B71508bE23712dC",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x69141E890F3a79cd2CFf552c0B71508bE23712dC.png"
},
{
  "chainId": 14,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 350 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x9A46864A3b0a7805B266C445289C3fAD1E48f18e",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x9A46864A3b0a7805B266C445289C3fAD1E48f18e.png"
}
```

## Extended Requirements
If your provider fulfill the extended requirements below, it may be eligible to receive the `listed` property. We regularly screen signal providers in `bifrost-wallet.providerlist.json` for eligiblity. If your provider has been eligible for more than 30 days without receiving the `listed` property or you think a mistake has been made, you may open an issue and provide data supporting your claim.

### Trustworthy
* The team developing and running the signal provider is known to other signal providers
* The on-chain address is referenced on the signal provider's website _(enforced 2023-03-31)_

### Resilient
* The team is only running one signal provider attracting vote power per network
* The provider uses a private node to submit prices

### Independent
* The team has no legal, development or operational ties to other signal providers
* The provider uses an algorithm developed in-house or an open-source alternative

### Available
* The provider has enough vote power to participate in the FTSO system
* The provider has at least 95% uptime, measured over the last 30 days

## Recommendations for Other Developers
If you're a wallet or dapp developer using this provider list in your software, we recommend that you:

1. **Hide** all providers missing the `listed` property from contexts where users choose between different providers, such as in provider lists.
2. **Show** all providers in contexts where a choice has already been made, such as in confirmation views and transaction details.
