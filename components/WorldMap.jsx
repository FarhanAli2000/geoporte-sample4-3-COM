'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import { OFFICES } from '@/lib/nav';
import { mountOfficeMap } from '@/lib/office-map';
import { Arrow, Close, Pin } from './icons';

const COUNTRIES = [...new Set(OFFICES.map((o) => o[1]))];

// "Other locations" footer button that opens a world map of every office.
export default function WorldMap() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(-1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const box = useRef(null),
    map = useRef(null),
    trigger = useRef(null),
    closeBtn = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    if (map.current) map.current.all();
    else if (box.current && !box.current.dataset.on) {
      box.current.dataset.on = '1';
      mountOfficeMap(box.current, setSel).then((m) => (map.current = m));
    }
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (map.current && sel > -1) map.current.show(sel);
  }, [sel]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <>
      <button type="button" className="floc" ref={trigger} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="fpin"><Pin /></span>
        <span><b>Other locations</b><small>Geoporte offices worldwide</small></span>
        <Arrow />
      </button>
      {mounted &&
        createPortal(
          <div
            className={'wmap' + (open ? ' open' : '')}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wmapTitle"
            aria-hidden={!open}
            data-lenis-prevent
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="wmap-box">
              <div className="wmap-head">
                <div>
                  <span className="wcap">Geoporte worldwide</span>
                  <h3 id="wmapTitle">Our Offices Around The World</h3>
                </div>
                <button type="button" className="wx" ref={closeBtn} onClick={close} aria-label="Close world map"><Close /></button>
              </div>
              <div className="wmap-body">
                <div className="wmap-map" ref={box} />
                <div className="wmap-side">
                  <button
                    type="button"
                    className={'wall' + (sel < 0 ? ' on' : '')}
                    onClick={() => {
                      setSel(-1);
                      map.current?.all();
                    }}
                  >
                    Show all {OFFICES.length} offices
                  </button>
                  {COUNTRIES.map((country) => (
                    <div className="wgroup" key={country}>
                      <h4>{country}<small>{OFFICES.filter((o) => o[1] === country).length}</small></h4>
                      <ul>
                        {OFFICES.map(([city, c, addr], i) =>
                          c !== country ? null : (
                            <li key={city} className={i === sel ? 'on' : undefined}>
                              <button type="button" onClick={() => setSel(i)}><b>{city}</b><span>{addr}</span></button>
                              <a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr)} target="_blank" rel="noopener noreferrer">
                                Directions <Arrow />
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
