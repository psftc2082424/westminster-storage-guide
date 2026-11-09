# Westminster Storage Guide

A mobile-first guide for volunteers at **Westminster Free Clinic**, opened by scanning a QR code. It has two parts:

- **Put supplies away** â€“ 11 steps in the clinic's required order, each highlighting the spot on a top-down map.
- **Explore the room** â€“ a tappable map; each zone shows its photos, items, quantities and placement instructions.

It is a plain static website (HTML, CSS, JavaScript, SVG). No accounts, no cookies, no tracking, nothing saved on the device, no patient information.

> **Status: draft.** The map and put-away order are real. Item names, descriptions, quantities, instructions and all photos are still placeholders ("Details needed" / "Photo needed") until the clinic supplies them.

## Who owns this
- Repository owner: GitHub account `psftc2082424` (personal account; consider transferring to a clinic-owned organization)
- Last reviewed: **2026-11-08** (update `lastReviewed` in `closet-data.js` each time someone checks it)

## Folder structure
```
index.html        page shell + the SVG map (inside <template id="map-template">)
styles.css        all colors/sizes (colors are variables at the top)
app.js            display logic only; no closet content
closet-data.js    ALL content: zones, items, steps, image paths  <- edit this
assets/items/     item photos        assets/zones/  zone photos        assets/branding/  logo
qr/               QR code image(s)
backup/           ZIP of the whole site
.nojekyll         tells GitHub Pages to serve files as-is
```
(There is no separate `map.svg`: the map lives inside `index.html` so it works when opened from a file and under any web address.)

## Run it locally
Double-clicking `index.html` works in most browsers. For an exact preview, open a terminal in this folder and run `python -m http.server 8000`, then visit http://localhost:8000.

## How to edit (no code changes needed)
All edits are in `closet-data.js`. Never change an `id` once it is in use.

- **Replace an image:** save the new photo in `assets/items/` (or `assets/zones/`), then set its `photo`/`placementPhoto`/`photos` entry, e.g. `{ src: "assets/items/gauze.jpg", alt: "Box of sterile gauze pads on the top shelf" }`. Keep `alt` meaningful. Empty = "Photo needed" box is shown. If a file is misspelled, the guide shows an "Image could not be loaded" box rather than breaking.
- **Add an item:** copy an existing line in `items`, give it a new unique `id`, set `zoneId` to a zone's id, and delete `placeholder: true` once filled in. To include it in the put-away order, add its id to a step's `itemIds`.
- **Remove / rename an item:** delete its line (and its id in any step), or change `name`.
- **Change the placement order:** reorder the lines in `steps`.
- **Edit a map zone:** the zone's text (name, letter, description, photos) is in `zones`. Its shape is the `<g id="hotspot-...">` in `index.html`; change `x`, `y`, `width`, `height` to move or resize. The map box is 1600 x 1160 units. To add a zone, add an entry to `zones` and a matching `<g id="hotspot-NEW">` with a `class="shape"` rect and a `<text class="zcode">`.
- The zone **letters** (Aâ€“M) match the stickers to print and place in the room.

## Publish / redeploy (GitHub Pages)
Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Any push to `main` republishes in about a minute. The site will be at `https://<account>.github.io/westminster-storage-guide/`. All paths are relative, so it works under that subfolder.

## Backup
- Download: repository page > green **Code** button > **Download ZIP**. 
- A copy of the site is also in `backup/` in this repo.
- Anyone can unzip it and open `index.html`; nothing else is required.

## Transfer to another GitHub account/organization
Repository Settings > General > Danger Zone > **Transfer**. Afterward the web address changes to the new owner's name, so re-create the QR code (and update the owner line above).

## Move to another static host
Upload the folder's contents as-is to any static host (Netlify, Cloudflare Pages, a clinic web server). No build step. Then make a new QR code for the new address.

## Custom domain later
Buy/own the domain, then Settings > Pages > Custom domain. Keep the QR code pointing at the domain (not github.io) so it survives future moves.

## Known limits
- Map is redrawn from a hand sketch and is **not to scale**.
- English only. Progress is not saved (by design).
- The "Boxes" area at the bottom right of the sketch is drawn as a dashed area but is not a zone yet.

