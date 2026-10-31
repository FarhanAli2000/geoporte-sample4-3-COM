'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { OFFICES } from '@/lib/nav';
import { mountOfficeMap } from '@/lib/office-map';

const COUNTRIES = [...new Set(OFFICES.map((o) => o[1]))];

// Contact-section map showing every office at once; the chips (and the office cards above it,
// matched by city name) fly to one office, "All offices" zooms back out.
export default function OfficeMap() {
  const [sel, setSel] = useState(-1);
  const wrap = useRef(null),
    box = useRef(null),
    map = useRef(null);

  // The map is built only once the section is near the viewport, so tiles don't load for nothing.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || box.current.dataset.on) return;
        box.current.dataset.on = '1';
        io.disconnect();
        mountOfficeMap(box.current, setSel, { inPage: true }).then((m) => (map.current = m));
      },
      { rootMargin: '300px' },
    );
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (map.current) sel < 0 ? map.current.all() : map.current.show(sel);
    document.querySelectorAll('.office').forEach((c) => c.classList.toggle('map-on', +c.dataset.k === sel));
  }, [sel]);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offs = [];
    document.querySelectorAll('.office').forEach((c) => {
      const k = OFFICES.findIndex((o) => c.querySelector('b')?.textContent.trim().startsWith(o[0]));
      if (k < 0) return;
      c.dataset.k = k;
      c.setAttribute('role', 'button');
      c.tabIndex = 0;
      c.setAttribute('aria-label', `Show ${OFFICES[k][0]} office on map`);
      const go = () => {
        setSel(k);
        wrap.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      };
      const onClick = (e) => !e.target.closest('a') && go();
      const onKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          go();
        }
      };
      c.addEventListener('click', onClick);
      c.addEventListener('keydown', onKey);
      offs.push(() => {
        c.removeEventListener('click', onClick);
        c.removeEventListener('keydown', onKey);
      });
    });
    return () => offs.forEach((f) => f());
  }, []);

  return (
    <div className="c-map rv" ref={wrap}>
      <div className="map-head">
        <div className="map-tag"><b>{OFFICES.length}</b> offices · {COUNTRIES.join(' & ')}</div>
        <div className="map-chips" role="group" aria-label="Show office on map">
          <button type="button" className={sel < 0 ? 'on' : undefined} onClick={() => setSel(-1)}>All offices</button>
          {OFFICES.map(([city], i) => (
            <button type="button" key={city} className={i === sel ? 'on' : undefined} onClick={() => setSel(i)}>{city}</button>
          ))}
        </div>
      </div>
      <div className="map" ref={box} role="region" aria-label="Map of Geoporte offices" />
    </div>
  );
}
