/*
 * closet-data.js  --  THE ONE PLACE TO EDIT CLOSET CONTENT
 * ---------------------------------------------------------------------------
 * Everything the guide shows comes from this file. app.js only displays it.
 *
 * Three lists, connected by stable IDs (never rename an id once it is in use):
 *
 *   zones  - the clickable places on the map (shelf, cart, cabinet ...).
 *            "hotspot" is the id of the matching shape in index.html's map.
 *            "code"    is the letter on the printed sticker inside the room.
 *   items  - the supplies. Each item points at ONE zone with "zoneId".
 *   steps  - the put-away order. Each step lists the items to place, by id.
 *
 * Images: put files in assets/ and write the path relative to this folder,
 * e.g.  { src: "assets/items/gauze.jpg", alt: "Box of sterile gauze pads" }
 * Leave an image as null (or [] for zone photos) and the guide shows a clearly
 * labeled "Photo needed" box instead.
 *
 * placeholder: true  -> the guide shows a "Details needed" badge.
 *                       Delete that line once the item is filled in.
 * Do not put patient information, faces, or private clinic data in here.
 */
window.CLOSET_DATA = {
  meta: {
    title: "Westminster Storage Guide",
    clinic: "Westminster Free Clinic",
    language: "en",
    lastReviewed: "2026-11-08",
    owner: "GitHub account psftc2082424"
  },

  zones: [
    { id: "beds", code: "A", name: "Beds", hotspot: "hotspot-beds", description: "", photos: [
      {"src": "assets/zones/beds-1.jpg", "alt": "Stack of black and maroon folding exam beds leaning against the wall, with two blue water coolers on the floor in front.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "carts", code: "B", name: "Carts", hotspot: "hotspot-carts", description: "", photos: [
      {"src": "assets/zones/carts-1.jpg", "alt": "Red and black rolling tool carts stacked two high in the corner.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."},
      {"src": "assets/zones/carts-2.jpg", "alt": "Red rolling tool cart with drawers beside a white column scale, with a clipboard and supplies on a lower shelf.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "scales", code: "C", name: "Scales", hotspot: "hotspot-scales", description: "", photos: [
      {"src": "assets/zones/scales-1.jpg", "alt": "Three white column weighing scales standing in front of red and black carts.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."},
      {"src": "assets/zones/scales-2.jpg", "alt": "Weighing-scale beams mounted on red and black carts, with a black folded bed on top.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "stools", code: "D", name: "Stools", hotspot: "hotspot-stools", description: "", photos: [
      {"src": "assets/zones/stools-1.jpg", "alt": "Swivel stool bases stored on top of a red cart near the ceiling.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "trash-can", code: "E", name: "Trash can", hotspot: "hotspot-trash-can", description: "", photos: [] },
    { id: "wire-cart", code: "F", name: "Wire cart", hotspot: "hotspot-wire-cart", description: "", photos: [
      {"src": "assets/zones/wire-cart-1.jpg", "alt": "White wire rolling cart holding hand sanitizer and supplies, beside a column scale and beige cabinets.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "vitals-cart", code: "G", name: "Vitals cart", hotspot: "hotspot-vitals-cart", description: "", photos: [] },
    { id: "cabinets", code: "H", name: "Cabinets", hotspot: "hotspot-cabinets", description: "", photos: [
      {"src": "assets/zones/cabinets-1.jpg", "alt": "Beige metal storage cabinets next to a white column scale and a black cart on a red base.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."},
      {"src": "assets/zones/cabinets-2.jpg", "alt": "Tall beige filing cabinet with an orange note on it, beside red rolling tool carts.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "small-whiteboard", code: "I", name: "Small whiteboard", hotspot: "hotspot-small-whiteboard", description: "", photos: [] },
    { id: "big-whiteboard", code: "J", name: "Big whiteboard", hotspot: "hotspot-big-whiteboard", description: "", photos: [
      {"src": "assets/zones/big-whiteboard-1.jpg", "alt": "Large whiteboard on the right side of the room, with red carts and scales in the back corner.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "book-cart", code: "K", name: "Book cart", hotspot: "hotspot-book-cart", description: "Behind the shredder and printer cart, left of the big whiteboard, in front of the carts and scales.", photos: [
      {"src": "assets/zones/book-cart-1.jpg", "alt": "Wooden rolling book cart filled with children's books, beside a small wooden table and a large whiteboard.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "shredder", code: "L", name: "Shredder", hotspot: "hotspot-shredder", description: "", photos: [
      {"src": "assets/zones/shredder-1.jpg", "alt": "Black paper shredder on the floor behind a printer cart, next to a large clear whiteboard.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "printer-cart", code: "M", name: "Printer cart", hotspot: "hotspot-printer-cart", description: "", photos: [
      {"src": "assets/zones/printer-cart-1.jpg", "alt": "White printer sitting on a gray rolling cart, with a black shredder behind it.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] },
    { id: "yellow-boxes", code: "N", name: "Yellow boxes", hotspot: "hotspot-yellow-boxes", description: "", photos: [
      {"src": "assets/zones/yellow-boxes-1.jpg", "alt": "Black and yellow storage bins stacked on a wheeled cart with cardboard boxes on top, in front of a wooden book cart.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."},
      {"src": "assets/zones/yellow-boxes-2.jpg", "alt": "Stacked black and yellow storage bins on a wheeled cart near the shredder and a wooden book cart.", "caption": "Photo of this area as it looked when photographed; the arrangement may differ slightly."}
    ] }
  ],

  items: [
    { id: "item-beds", zoneId: "beds", name: "Beds", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-carts", zoneId: "carts", name: "Carts", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-scales", zoneId: "scales", name: "Scales", description: "Weighing scales.", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-stools", zoneId: "stools", name: "Stools", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-trash-can", zoneId: "trash-can", name: "Trash can", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-wire-cart", zoneId: "wire-cart", name: "Wire cart", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-vitals-cart", zoneId: "vitals-cart", name: "Vitals cart", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-cabinets", zoneId: "cabinets", name: "Cabinets", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-small-whiteboard", zoneId: "small-whiteboard", name: "Small whiteboard", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-big-whiteboard", zoneId: "big-whiteboard", name: "Big whiteboard", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-book-cart", zoneId: "book-cart", name: "Book cart", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-shredder", zoneId: "shredder", name: "Shredder", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-printer-cart", zoneId: "printer-cart", name: "Printer cart", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true },
    { id: "item-yellow-boxes", zoneId: "yellow-boxes", name: "Yellow boxes", description: "", quantity: "", instructions: "", photo: null, placementPhoto: null, placeholder: true }
  ],

  /* The put-away order, exactly as given by the clinic. To reorder, move lines. */
  steps: [
    { id: "step-01", title: "Beds, carts and scales", itemIds: ["item-beds", "item-carts", "item-scales"] },
    { id: "step-02", title: "Stools and trash can", itemIds: ["item-stools", "item-trash-can"] },
    { id: "step-03", title: "Wire cart", itemIds: ["item-wire-cart"] },
    { id: "step-04", title: "Vitals cart", itemIds: ["item-vitals-cart"] },
    { id: "step-05", title: "Cabinets", itemIds: ["item-cabinets"] },
    { id: "step-06", title: "Small whiteboard", itemIds: ["item-small-whiteboard"] },
    { id: "step-07", title: "Big whiteboard", itemIds: ["item-big-whiteboard"] },
    { id: "step-08", title: "Book cart", itemIds: ["item-book-cart"] },
    { id: "step-09", title: "Shredder", itemIds: ["item-shredder"] },
    { id: "step-10", title: "Printer cart", itemIds: ["item-printer-cart"] },
    { id: "step-11", title: "Yellow boxes", itemIds: ["item-yellow-boxes"] }
  ]
};
