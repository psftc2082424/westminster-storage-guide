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
    { id: "beds", code: "A", name: "Beds", hotspot: "hotspot-beds", description: "", photos: [] },
    { id: "carts", code: "B", name: "Carts", hotspot: "hotspot-carts", description: "", photos: [] },
    { id: "scales", code: "C", name: "Scales", hotspot: "hotspot-scales", description: "", photos: [] },
    { id: "stools", code: "D", name: "Stools", hotspot: "hotspot-stools", description: "", photos: [] },
    { id: "trash-can", code: "E", name: "Trash can", hotspot: "hotspot-trash-can", description: "", photos: [] },
    { id: "wire-cart", code: "F", name: "Wire cart", hotspot: "hotspot-wire-cart", description: "", photos: [] },
    { id: "vitals-cart", code: "G", name: "Vitals cart", hotspot: "hotspot-vitals-cart", description: "", photos: [] },
    { id: "cabinets", code: "H", name: "Cabinets", hotspot: "hotspot-cabinets", description: "", photos: [] },
    { id: "small-whiteboard", code: "I", name: "Small whiteboard", hotspot: "hotspot-small-whiteboard", description: "", photos: [] },
    { id: "big-whiteboard", code: "J", name: "Big whiteboard", hotspot: "hotspot-big-whiteboard", description: "", photos: [] },
    { id: "book-cart", code: "K", name: "Book cart", hotspot: "hotspot-book-cart", description: "Behind the shredder and printer cart, left of the big whiteboard, in front of the carts and scales.", photos: [] },
    { id: "shredder", code: "L", name: "Shredder", hotspot: "hotspot-shredder", description: "", photos: [] },
    { id: "printer-cart", code: "M", name: "Printer cart", hotspot: "hotspot-printer-cart", description: "", photos: [] },
    { id: "yellow-boxes", code: "N", name: "Yellow boxes", hotspot: "hotspot-yellow-boxes", description: "", photos: [] }
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
