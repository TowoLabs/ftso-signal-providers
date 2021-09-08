# Flare Time Series Oracle Signal Providers

Any entity operating an FTSO signal provider service may submit a pull request to this repository. Inactive, underperforming or misbehaving signal providers will be denied and/or removed. 

To add you signal provider's details, copy an existing entry in `bifrost-wallet.providerlist.json`, fill your details and add it to the bottom of the list. 

Add one entry per network you intend to submit prices on. For example, if you're submitting prices on both Songbird and Flare, add two separate entries with different `chainId` values.

## Requirements
* All attributes are required and must be in ASCII
* `chainId` must be one of 14 (Songbird), 16 (Coston) or 19 (Flare)
* `name` may be max 32 characters
* `description` may be max 250 characters
* `url` may be max 100 characters
    * Must be prefixed with https://
    * Must redirect HTTP to HTTPS
* `address` must be 40 characters hex
    * Must be the same Songbird, Coston or Flare address that you submit prices with
    * Must be all lowercase
* `logoURI` must be this repository's raw GitHub user content path
  * Must end with your address in all lowercase and a `.png` file extension
  * Must fulfill the PNG image requirements

### PNG Image Requirements
* The aspect ratio must be 1, use the same width and height
* The width and height must be between 128 px and 256 px
* The background must be transparent or fill the entire image
* The maximum filesize is 24 KB, optimized using for example: https://tinypng.com

### Example for Songbird

```json
{
  "chainId": 19,
  "name": "Towo Labs",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://towolabs.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
}
```

### Example for Songbird and Flare

```json
{
  "chainId": 19,
  "name": "Towo Labs",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://towolabs.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
},
{
  "chainId": 14,
  "name": "Towo Labs",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://towolabs.com",
  "address": "0x1234123412341234123412341234123412341234",
  "logoURI": "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0x1234123412341234123412341234123412341234.png"
}
```