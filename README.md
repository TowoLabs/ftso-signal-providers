# Flare Time Series Oracle Signal Providers

Any individual or entity operating an FTSO signal provider service, passing all tests and fulfilling all requirements, may submit a pull request to this repository. We do not accept requests from unknown or anonymous individuals or entities. We may require you to prove ownership of your URL and/or address before accepting your contribution. Inactive, underperforming or misbehaving signal providers will be denied and removed.

## How to Add Your Signal Provider
1. Read the [Requirements](#requirements).
2. Fork the repository and run `yarn install`.
3. Copy an existing provider entry in `bifrost-wallet.providerlist.json`
4. Fill your details and add your entry to the bottom of the list
5. Add your logo to `assets/` and make sure it's named correctly
6. Run `yarn test` and make sure all tests pass
7. Submit a pull request to the `next` branch

## Requirements
* All attributes are required and must be in ASCII
* `chainId` must be one of 19 (Songbird), 14 (Flare) or 16 (Coston)
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

### Example for Songbird

```json
{
  "chainId": 19,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 350 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x69141E890F3a79cd2CFf552c0B71508bE23712dC",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x69141E890F3a79cd2CFf552c0B71508bE23712dC.png"
}
```

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
