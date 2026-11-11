/*
 * app.js -- shows the content from closet-data.js. No closet content lives here.
 * Pages (hash routes, so the Back button and direct links work):
 *   #/            home
 *   #/guide/N     put-away step N          #/guide/done   finished screen
 *   #/map         full closet map          #/map/ZONE-ID  one zone's details
 * Nothing is saved or sent anywhere. "Done" marks only last until the page reloads.
 */
(function () {
  'use strict';

  var D = window.CLOSET_DATA;
  var app = document.getElementById('app');
  if (!D) { app.textContent = 'The guide content (closet-data.js) failed to load.'; return; }

  var zones = {}, items = {};
  D.zones.forEach(function (z) { zones[z.id] = z; });
  D.items.forEach(function (i) { items[i.id] = i; });
  var steps = D.steps;
  var done = new Set();
  var firstRender = true;
  var lastZone = null;

  /* ---------- helpers ---------- */
  function el(tag, props) {
    var n = document.createElement(tag);
    for (var k in (props || {})) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) {
      [].concat(arguments[i]).forEach(function (c) {
        if (c == null || c === false) return;
        n.append(c.nodeType ? c : document.createTextNode(c));
      });
    }
    return n;
  }

  function placeholder(text) {
    return el('div', { class: 'photo-missing', role: 'img', 'aria-label': text, text: text });
  }

  function figure(image, neededLabel) {
    var f = el('figure', { class: 'photo' });
    if (!image || !image.src) { f.append(placeholder('Photo needed: ' + neededLabel)); return f; }
    var img = el('img', { src: image.src, alt: image.alt || '', loading: 'lazy' });
    img.addEventListener('error', function () {
      f.replaceChildren(placeholder('Image could not be loaded (' + image.src + ')'));
    });
    f.append(img);
    if (image.caption) f.append(el('figcaption', { text: image.caption }));
    return f;
  }

  function zoneLabel(z) { return 'Zone ' + z.code + ': ' + z.name; }
  function stepZoneIds(step) {
    var out = [];
    step.itemIds.forEach(function (id) {
      var it = items[id];
      if (it && out.indexOf(it.zoneId) < 0) out.push(it.zoneId);
    });
    return out;
  }
  function stepNumberForZone(zoneId) {
    for (var i = 0; i < steps.length; i++) if (stepZoneIds(steps[i]).indexOf(zoneId) >= 0) return i + 1;
    return null;
  }

  /* ---------- map ---------- */
  function buildMap(opts) {
    var svg = document.getElementById('map-template').content.firstElementChild.cloneNode(true);
    D.zones.forEach(function (z) {
      var g = svg.querySelector('#' + z.hotspot);
      if (!g) { console.warn('No map shape with id ' + z.hotspot + ' for zone ' + z.id); return; }
      g.classList.add('zone');
      g.dataset.zone = z.id;
      g.querySelectorAll('.zcode').forEach(function (t) { t.textContent = z.code; });
      if (opts.highlight) {
        var on = opts.highlight.indexOf(z.id) >= 0;
        g.classList.add(on ? 'is-highlight' : 'is-dim');
      }
      if (opts.selected === z.id) g.classList.add('is-selected');
      if (opts.interactive) {
        g.setAttribute('role', 'button');
        g.setAttribute('tabindex', '0');
        g.setAttribute('aria-label', zoneLabel(z));
        if (opts.selected === z.id) g.setAttribute('aria-current', 'true');
        g.addEventListener('click', function () { location.hash = '#/map/' + z.id; });
        g.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); location.hash = '#/map/' + z.id; }
        });
      }
    });
    if (!opts.interactive) { svg.setAttribute('aria-hidden', 'true'); svg.classList.add('is-static'); }
    return svg;
  }

  /* ---------- shared pieces ---------- */
  function itemCard(item, opts) {
    var z = zones[item.zoneId];
    var card = el('article', { class: 'item-card' },
      el('h3', null, item.name, item.placeholder ? el('span', { class: 'badge', text: 'Details needed' }) : null),
      figure(item.photo || (opts.showZone && z && z.photos && z.photos[0]) || null, 'photo of ' + item.name),
      item.description ? el('p', { text: item.description }) : el('p', { class: 'needed', text: 'Description needed.' }),
      el('dl', null,
        z && opts.showZone ? [el('dt', { text: 'Where it goes' }),
          el('dd', null, el('span', { class: 'zone-chip', text: z.code }), z.name + ' ',
            el('a', { href: '#/map/' + z.id, text: '(view zone on map)' }))] : null,
        el('dt', { text: 'Quantity' }),
        el('dd', item.quantity ? { text: item.quantity } : { class: 'needed', text: 'Quantity needed.' })
      ),
      item.placementPhoto ? figure(item.placementPhoto, '') : null
    );
    return card;
  }

  /* ---------- pages ---------- */
  function renderHome() {
    document.title = D.meta.title;
    app.replaceChildren(
      el('h1', { tabindex: '-1', text: 'Welcome, volunteer' }),
      el('p', { class: 'lead', text: 'This guide shows where every supply goes in the storage room, so you can put things away correctly without anyone explaining it in person.' }),
      el('div', { class: 'choices' },
        el('a', { class: 'choice', href: '#/guide/1' }, el('strong', { text: 'Put supplies away' }), 'Step by step, in the right order.'),
        el('a', { class: 'choice', href: '#/map' }, el('strong', { text: 'Explore the room' }), 'Tap any place on the map to see what belongs there.')
      ),
      el('section', { class: 'howto' },
        el('h2', { text: 'How it works' }),
        el('ol', null,
          el('li', { text: 'Pick "Put supplies away" and follow the steps from 1 to ' + steps.length + '.' }),
          el('li', { text: 'Each step highlights the spot on the map. Match the letter to the label on the shelf or cart.' }),
          el('li', { text: 'Tap Done when that spot is finished, then Next.' })
        )
      )
    );
  }

  function renderStep(n) {
    var step = steps[n - 1];
    var zoneIds = stepZoneIds(step);
    document.title = 'Step ' + n + ' of ' + steps.length + ': ' + step.title + ' - ' + D.meta.title;

    var map = buildMap({ highlight: zoneIds });
    var caption = 'Highlighted: ' + zoneIds.map(function (id) { return zoneLabel(zones[id]); }).join('; ') + '. Door is at the bottom.';
    var isDone = done.has(step.id);

    var go = function (hash) { return function () { location.hash = hash; }; };
    var doneBtn = el('button', { class: 'btn done-btn', type: 'button', onclick: function () {
      done.add(step.id);
      location.hash = n === steps.length ? '#/guide/done' : '#/guide/' + (n + 1);
    } }, isDone ? 'Done ✓' : 'Done');
    var prev = el('button', { class: 'btn', type: 'button', disabled: n === 1, onclick: go('#/guide/' + (n - 1)) }, '← Previous');
    var next = el('button', { class: 'btn', type: 'button', disabled: n === steps.length, onclick: go('#/guide/' + (n + 1)) }, 'Next →');

    app.replaceChildren(
      el('p', { class: 'step-count' }, 'Step ' + n + ' of ' + steps.length, isDone ? el('span', { class: 'badge ok', text: 'Marked done' }) : null),
      el('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Progress', 'aria-valuemin': '0', 'aria-valuemax': String(steps.length), 'aria-valuenow': String(n) },
        el('div', { style: 'width:' + Math.round((n / steps.length) * 100) + '%' })),
      el('h1', { tabindex: '-1', text: step.title }),
      el('div', { class: 'step-layout' },
        el('div', { class: 'mini-map-col' },
          el('figure', { class: 'mini-map-wrap', style: 'margin:0' }, map, el('figcaption', { text: caption }))),
        el('div', null, step.itemIds.map(function (id) { return itemCard(items[id], { showZone: true }); }))
      ),
      el('div', { class: 'controls' }, prev, doneBtn, next),
      el('div', { class: 'restart-row' }, el('button', { class: 'btn', type: 'button', onclick: restart }, 'Restart from step 1'))
    );
  }

  function restart() {
    done.clear();
    if (location.hash === '#/guide/1') route(); else location.hash = '#/guide/1';
  }

  function renderDone() {
    document.title = 'All done - ' + D.meta.title;
    app.replaceChildren(
      el('h1', { tabindex: '-1', text: 'All done — thank you!' }),
      el('p', { class: 'lead', text: 'You reached the end of the put-away list. Anything you did not mark done is listed below.' }),
      el('ul', { class: 'checklist' }, steps.map(function (s, i) {
        return el('li', null, done.has(s.id) ? '✓ ' : '○ ', el('a', { href: '#/guide/' + (i + 1), text: 'Step ' + (i + 1) + ': ' + s.title }),
          done.has(s.id) ? null : ' (not marked done)');
      })),
      el('div', { class: 'restart-row' },
        el('button', { class: 'btn primary', type: 'button', onclick: restart }, 'Restart from step 1'), ' ',
        el('a', { class: 'btn', href: '#/' }, 'Back to start'))
    );
  }

  function renderMap(zoneId) {
    var z = zones[zoneId];
    document.title = (z ? zoneLabel(z) + ' - ' : 'Map - ') + D.meta.title;

    var map = buildMap({ interactive: true, selected: z && z.id });
    var legend = el('ul', { class: 'legend', 'aria-label': 'All zones' }, D.zones.map(function (zz) {
      return el('li', null, el('a', { href: '#/map/' + zz.id, 'aria-current': z && z.id === zz.id ? 'true' : null },
        el('span', { class: 'code', text: zz.code }), zz.name));
    }));
    var mapCol = el('section', { class: 'map-col', 'aria-label': 'Closet map' },
      z ? null : el('h1', { tabindex: '-1', text: 'Explore the room' }),
      el('p', { class: 'map-note', text: 'Tap a zone to see what belongs there. The door is at the bottom. Map is not to scale.' }),
      map, legend);

    var panel = null;
    if (z) {
      var stepNo = stepNumberForZone(z.id);
      var zItems = D.items.filter(function (i) { return i.zoneId === z.id; });
      panel = el('section', { class: 'panel', 'aria-label': zoneLabel(z) },
        el('a', { class: 'btn back', href: '#/map' }, '← Back to full map'),
        el('h1', { tabindex: '-1' }, el('span', { class: 'zone-chip', text: z.code }), z.name),
        stepNo ? el('p', { text: 'Put-away step ' + stepNo + ' of ' + steps.length + '. ' }, el('a', { href: '#/guide/' + stepNo, text: 'Open that step' })) : null,
        z.description ? el('p', { text: z.description }) : el('p', { class: 'needed', text: 'Description needed.' }),
        (z.photos && z.photos.length ? z.photos : [null]).map(function (p) { return figure(p, 'photo of ' + z.name); }),
        el('h2', { text: 'Items here' }),
        zItems.length ? zItems.map(function (i) { return itemCard(i, { showZone: false }); }) : el('p', { class: 'needed', text: 'No items listed for this zone yet.' }),
        el('a', { class: 'btn', href: '#/map' }, '← Back to full map')
      );
    }
    app.replaceChildren(el('div', { class: 'explore' + (z ? ' has-selection' : '') }, panel, mapCol));
    return z;
  }

  /* ---------- routing ---------- */
  function route() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    var page = parts[0], arg = parts[1];
    var hadFocusZone = null;
    var navPage = null;

    if (page === 'guide') {
      navPage = 'guide';
      if (arg === 'done') renderDone();
      else {
        var n = parseInt(arg, 10);
        if (!(n >= 1 && n <= steps.length)) n = 1;
        renderStep(n);
      }
    } else if (page === 'map') {
      navPage = 'map';
      var z = renderMap(arg);
      if (z) lastZone = z.id; else hadFocusZone = lastZone;
      if (!z && arg) { /* unknown zone id: fall through to full map */ }
    } else {
      renderHome();
    }

    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.dataset.nav === navPage) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    if (!firstRender) {
      window.scrollTo(0, 0);
      var target = hadFocusZone && app.querySelector('[data-zone="' + hadFocusZone + '"]');
      if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'center' }); lastZone = null; }
      else { var h = app.querySelector('h1'); if (h) h.focus({ preventScroll: true }); }
    }
    firstRender = false;
  }

  document.getElementById('footer-text').textContent =
    D.meta.clinic + ' — guide last reviewed ' + D.meta.lastReviewed +
    '. This guide stores nothing on your device and contains no patient information.';

  window.addEventListener('hashchange', route);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && /^#\/map\/./.test(location.hash)) location.hash = '#/map';
  });
  route();
})();
