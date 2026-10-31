import { OFFICES } from './nav';

// Pin labels that would overlap at world zoom get pushed to a different side.
const LABEL = { Perth: ['left', -12, 0], Melbourne: ['bottom', 0, 12], Sydney: ['top', 0, -12] };
const tiles = (s) => `https://server.arcgisonline.com/ArcGIS/rest/services/${s}/MapServer/tile/{z}/{y}/{x}`;

// Leaflet map of every office in `el`, used by the footer world map and the Contact section.
// Leaflet touches `window`, so it is imported here at call time rather than at module load.
// `inPage` maps only wheel-zoom after a click, so scrolling the page doesn't get trapped by them.
// Returns { all() to fit every office, show(i) to fly to one and highlight its pin }.
export async function mountOfficeMap(el, onPick, { inPage = false } = {}) {
  const { default: L } = await import('leaflet');
  const m = L.map(el, { minZoom: 2, maxZoom: 19, worldCopyJump: true, scrollWheelZoom: !inPage });
  if (inPage) {
    m.on('click', () => m.scrollWheelZoom.enable());
    m.on('mouseout', () => m.scrollWheelZoom.disable());
  }
  const street = L.tileLayer(tiles('World_Street_Map'), {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
  }).addTo(m);
  const sat = L.layerGroup([
    L.tileLayer(tiles('World_Imagery'), { maxZoom: 19, attribution: 'Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics' }),
    L.tileLayer(tiles('Reference/World_Boundaries_and_Places'), { maxZoom: 19 }),
  ]);
  L.control.layers({ Map: street, Satellite: sat }, null, { position: 'topright', collapsed: false }).addTo(m);
  const icon = L.divIcon({ className: 'wpin', html: '<i></i>', iconSize: [18, 18], iconAnchor: [9, 9] });
  const pins = OFFICES.map(([city, country, , lat, lng], i) => {
    const [direction, x, y] = LABEL[city] || ['right', 12, 0];
    return L.marker([lat, lng], { icon, title: `${city}, ${country}`, keyboard: true })
      .bindTooltip(`<b>${city}</b><small>${country}</small>`, { permanent: true, direction, offset: [x, y], className: 'wlabel' })
      .on('click', () => onPick(i))
      .addTo(m);
  });
  const mark = (i) => pins.forEach((p, j) => p.getElement()?.classList.toggle('on', j === i));
  const all = () => {
    mark(-1);
    m.invalidateSize();
    m.fitBounds(OFFICES.map((o) => [o[3], o[4]]), { padding: [60, 60], maxZoom: 4 });
  };
  const show = (i) => {
    mark(i);
    m.flyTo([OFFICES[i][3], OFFICES[i][4]], 14, { duration: 1.2 });
  };
  all();
  return { all, show };
}
