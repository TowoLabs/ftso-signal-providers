# Flare Time Series Oracle Signal Providers

Any entity operating an FTSO signal provider service may submit a pull request to this repository. Inactive, underperforming or misbehaving signal providers will be denied and removed.

Each signal provider has its own file with a unique lowercase ASCII (a-z) as filename and `.json` as file extension. You can find the source data in _data/providers.

## Provider File Requirements
* All attributes must be in ASCII
* `name` may be max 32 characters
* `description` may be max 250 characters
* `url` may be max 100 characters
    * Must be prefixed with https://
    * Must redirect HTTP to HTTPS
* `address` must be 40 characters hex
    * Must be a valid Flare address
    * Must be EIP-55 checksummed

### Example towolabs.json

```json
{
  "name": "Towo Labs",
  "description": "This is your chance to describe your signal provider service. Try to highlight your unique selling points and why users should delegate to your service. Your description may be no longer than 250 characters. Shorter is better.",
  "url": "https://towolabs.com",
  "address": "0xBCEB62c761A0c6A9bdbF2E072589C7bD0bDb406F"
}
```

Each signal provider file must include a unique SVG icon in _data/icons. The icon filename must be exactly the same as the provider filename, but use `.svg` as file extension. See for example _data/icons/towolabs.svg.

## SVG Icon Requirements
* The aspect ratio must be 1, use the same width and height
* The viewport must be the same size as the image
* The background must be transparent or fill the entire image
* No rasterized images, vector graphics only
* No animation or event attributes
* No script or style elements
* No xlink or foreign objects
* Maximum filesize of 32 KB
* Optimized using e.g: https://jakearchibald.github.io/svgomg/