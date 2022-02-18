# Flare Time Series Oracle Signal Providers

Any individual or entity operating an FTSO signal provider service may submit a pull request to this repository. We do not accept requests from unknown or anonymous individuals or entities. We may require you to prove ownership of your URL and/or address before accepting your contribution. Inactive, underperforming or misbehaving signal providers will be denied and removed.

## How to Add Your Signal Provider
1. Read the [Requirements](#requirements).
2. Copy an existing provider entry in `bifrost-wallet.providerlist.json`
3. Fill your details and add your entry to the bottom of the list
4. Upload your logo to `assets/`
5. Submit a pull request

Add one entry per network that you intend to submit prices on. For example, if you're submitting price data to both Songbird and Flare, add two separate entries with different `chainId` values.

## Requirements
* All attributes are required and must be in ASCII
* `chainId` must be one of 19 (Songbird), 14 (Flare) or 16 (Coston)
* `name` may be max 32 characters
* `description` may be max 250 characters
* `url` may be max 100 characters
    * Must be prefixed with https://
    * Must redirect HTTP to HTTPS
* `address` must be 40 characters hex
    * Must be the same Songbird or Flare address that you submit prices with
    * Must be EIP-55 checksummed
* `logoURI` must be this repository's raw GitHub user content path
  * Must end with your checksummed address and a `.png` file extension
  * Must fulfill the [PNG image requirements](#png-image-requirements)

### PNG Image Requirements
* The aspect ratio must be 1, use the same width and height
* The width and height must be between 128 px and 256 px
* The background must be transparent or fill the entire image
* The maximum filesize is 24 KB, optimized using: https://tinypng.com

### Example for Songbird

```json
{
  "chainId": 19,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
}
```

### Example for Songbird and Flare

```json
{
  "chainId": 19,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
},
{
  "chainId": 14,
  "name": "Example Name",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://example.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
}
```
