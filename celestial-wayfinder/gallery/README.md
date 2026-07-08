# Gallery images

Drop photos for the Wayfinder gallery in this folder.

To add a photo to the page, open `celestial-wayfinder/index.html`, find the
`GALLERY` section, and copy one `<button class="gallery-thumb">` block:

```html
<button class="gallery-thumb" data-caption="Your caption text here.">
  <img src="/celestial-wayfinder/gallery/your-photo.jpg" alt="Short description of the photo" loading="lazy">
</button>
```

- `src` — path to the image in this folder. Use the full `/celestial-wayfinder/gallery/...` root-relative path (not a bare relative path) so it resolves correctly regardless of trailing slashes on the page URL.
- `alt` — short accessibility description of the image.
- `data-caption` — the text shown below the photo when it's opened full-size.
