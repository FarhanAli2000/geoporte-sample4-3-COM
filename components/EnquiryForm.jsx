'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Arrow } from './icons';
import { EMAIL } from '@/lib/nav';
import { COUNTRIES, REGIONS } from '@/lib/countries';

const TOP = ['AU', 'NZ', 'AE'];
const ALL = COUNTRIES.map(([code, name, dial]) => ({ code, name, dial: '+' + dial }));
const LIST = [...TOP.map((c) => ALL.find((x) => x.code === c)), ...ALL.filter((x) => !TOP.includes(x.code))];
const country = (code) => ALL.find((x) => x.code === code);
const SECTOR_CHIPS = ['Transport', 'Buildings', 'Water', 'Ports & Marine', 'Energy', 'Mining', 'Other'];
const ENQUIRY_TYPES = ['New project', 'Request a fee proposal', 'General enquiry', 'Careers'];
const STATE_ABBR = {
  'Australian Capital Territory': 'ACT',
  'New South Wales': 'NSW',
  'Northern Territory': 'NT',
  Queensland: 'QLD',
  'South Australia': 'SA',
  Tasmania: 'TAS',
  Victoria: 'VIC',
  'Western Australia': 'WA',
};

const Flag = ({ code }) => <img className="flag" src={`https://flagcdn.com/${code.toLowerCase()}.svg`} alt="" width="20" height="15" loading="lazy" />;

// Grow the textarea with its content instead of showing a scrollbar.
const autosize = (e) => {
  const t = e.currentTarget || e;
  t.style.height = 'auto';
  t.style.height = t.scrollHeight + t.offsetHeight - t.clientHeight + 'px';
};

// Up/Down/Enter/Escape handling shared by the dial-code and suburb lists.
const listKeys = (e, len, setActive, pick, close) => {
  if (e.key === 'ArrowDown') setActive((i) => Math.min(i + 1, len - 1));
  else if (e.key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0));
  else if (e.key === 'Enter') pick();
  else if (e.key === 'Escape') close();
  else return;
  e.preventDefault();
};

// Closes a popup when the pointer goes down anywhere outside `ref`.
function useOutside(ref, open, close) {
  useEffect(() => {
    if (!open) return;
    const fn = (e) => !ref.current?.contains(e.target) && close();
    document.addEventListener('pointerdown', fn);
    return () => document.removeEventListener('pointerdown', fn);
  }, [open]);
}

// Searchable country dialling-code picker shown in front of the phone number.
function DialPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const wrap = useRef(null),
    search = useRef(null),
    list = useRef(null);
  const term = q.trim().toLowerCase().replace(/^\+/, '');
  const shown = term ? LIST.filter((c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase() === term || c.dial.slice(1).startsWith(term)) : LIST;
  const cur = country(value);
  const close = () => {
    setOpen(false);
    wrap.current?.querySelector('button')?.focus();
  };
  const pick = (code) => {
    onChange(code);
    close();
  };

  useOutside(wrap, open, () => setOpen(false));
  useEffect(() => {
    if (!open) return;
    setQ('');
    setActive(Math.max(0, LIST.findIndex((c) => c.code === value)));
    search.current?.focus();
  }, [open]);
  useEffect(() => list.current?.children[active]?.scrollIntoView({ block: 'nearest' }), [active, open]);

  return (
    <div className="dial" ref={wrap}>
      <button type="button" className="dial-btn" aria-label={`Phone country code: ${cur.name} ${cur.dial}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Flag code={cur.code} />
        <span>{cur.dial}</span>
      </button>
      {open && (
        <div className="dial-pop" onKeyDown={(e) => listKeys(e, shown.length, setActive, () => shown[active] && pick(shown[active].code), close)}>
          <input
            ref={search}
            className="dial-search"
            type="text"
            placeholder="Search country or code"
            aria-label="Search country or code"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
          />
          <ul className="dial-list" role="listbox" ref={list} data-lenis-prevent aria-label="Country codes">
            {shown.map((c, i) => (
              <li key={c.code} role="option" aria-selected={c.code === value} className={i === active ? 'on' : undefined} onMouseEnter={() => setActive(i)} onClick={() => pick(c.code)}>
                <Flag code={c.code} />
                <span className="dial-name">{c.name}</span>
                <span className="dial-code">{c.dial}</span>
              </li>
            ))}
            {!shown.length && <li className="dial-none">No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

let localities; // fetched once, on first focus of the location field in Australia
// Project location with Australian suburb suggestions; picking one also fills the state.
function LocationField({ value, onChange, countryCode, region, onRegion }) {
  const [places, setPlaces] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef(null),
    list = useRef(null);
  const au = countryCode === 'AU';
  const term = value.trim().toLowerCase();
  // Prefix matches first, then places in the chosen state.
  const rank = (p) => 2 * !p.key.startsWith(term) + +(p.state !== region);
  const hits = au && term.length >= 2 ? places.filter((p) => p.key.includes(term)).sort((a, b) => rank(a) - rank(b)).slice(0, 8) : [];
  const show = open && hits.length > 0;
  const pick = (p) => {
    onChange(p.name);
    onRegion(p.state);
    setOpen(false);
  };

  useOutside(wrap, open, () => setOpen(false));
  useEffect(() => {
    if (!au || !open) return;
    localities ||= fetch('/data/au-localities.json')
      .then((r) => r.json())
      .then((d) => Object.entries(d).flatMap(([state, names]) => names.map((name) => ({ name, state, key: name.toLowerCase() }))))
      .catch(() => ((localities = undefined), []));
    localities.then(setPlaces);
  }, [au, open]);
  useEffect(() => list.current?.children[active]?.scrollIntoView({ block: 'nearest' }), [active]);

  return (
    <div className="field loc" ref={wrap}>
      <input
        id="f-location"
        name="location"
        placeholder=" "
        autoComplete={au ? 'off' : 'address-level2'}
        role={au ? 'combobox' : undefined}
        aria-autocomplete={au ? 'list' : undefined}
        aria-expanded={au ? show : undefined}
        aria-controls={au ? 'f-location-list' : undefined}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => show && listKeys(e, hits.length, setActive, () => pick(hits[active]), () => setOpen(false))}
      />
      <label htmlFor="f-location">Project location (suburb or city)</label>
      <span className="ul"></span>
      {show && (
        <div className="dial-pop loc-pop">
          <ul className="dial-list" id="f-location-list" role="listbox" ref={list} data-lenis-prevent aria-label="Suburb or city suggestions">
            {hits.map((p, i) => (
              <li key={p.state + p.name} role="option" aria-selected={i === active} className={i === active ? 'on' : undefined} onMouseEnter={() => setActive(i)} onPointerDown={(e) => e.preventDefault()} onClick={() => pick(p)}>
                <span className="dial-name">{p.name}</span>
                <span className="dial-code">{STATE_ABBR[p.state]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Submissions go to /api/enquiry, which emails them to the admin inbox (see app/api/enquiry/route.js).
export default function EnquiryForm() {
  const [sectors, setSectors] = useState([]);
  const [countryCode, setCountryCode] = useState('AU');
  const [dial, setDial] = useState('AU');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);
  const regions = REGIONS[countryCode];

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (name) => String(new FormData(form).get(name) || '').trim();
    const name = field('name'), email = field('email'), phone = field('phone'), message = field('message');
    const shake = () => gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,.3)' });

    const missing = [
      [!name, 'name', 'your name'],
      [!/^\S+@\S+\.\S+$/.test(email), 'email', 'a valid email'],
      [!/^[\d\s()+-]{6,20}$/.test(phone), 'phone', 'your phone number'],
      [!message, 'message', 'a few project details'],
    ].filter(([bad]) => bad);
    if (missing.length) {
      const parts = missing.map((m) => m[2]);
      setStatus({ type: 'err', text: `Please add ${parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts.at(-1) : parts[0]}.` });
      form.elements[missing[0][1]]?.focus();
      shake();
      return;
    }
    if (!form.elements.consent.checked) {
      setStatus({ type: 'err', text: 'Please tick the privacy consent box so we can respond to your enquiry.' });
      shake();
      return;
    }

    setSending(true);
    setStatus({ type: '', text: 'Sending…' });
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: `${country(dial).dial} ${phone}`,
          organisation: field('organisation'),
          country: country(countryCode).name,
          region,
          location: location.trim(),
          enquiryType: field('enquiryType'),
          sectors,
          message,
          consent: true,
          website: field('website'),
          page: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error('not sent');
      setStatus({ type: 'ok', text: `Thank you, ${name.split(' ')[0]}. The right engineer will reply within one business day.` });
      form.reset();
      autosize(form.elements.message);
      setSectors([]);
      setRegion('');
      setLocation('');
    } catch {
      setStatus({ type: 'err', text: `Sorry, your enquiry could not be sent. Please email ${EMAIL} directly.` });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form rv" id="form" noValidate onSubmit={onSubmit}>
      <h3>Start A Conversation</h3>
      {/* Honeypot: hidden from people, bots that fill it are ignored by the server */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <div className="field"><input id="f-name" name="name" placeholder=" " autoComplete="name" required /><label htmlFor="f-name">Full name</label><span className="ul"></span></div>
      <div className="field"><input id="f-email" name="email" type="email" placeholder=" " autoComplete="email" required /><label htmlFor="f-email">Email</label><span className="ul"></span></div>
      <div className="field sel phone">
        <div className="phone-row">
          <DialPicker value={dial} onChange={setDial} />
          <input id="f-phone" name="phone" type="tel" placeholder="Phone number" autoComplete="tel-national" required />
        </div>
        <label htmlFor="f-phone">Phone</label><span className="ul"></span>
      </div>
      <div className="field"><input id="f-org" name="organisation" placeholder=" " autoComplete="organization" /><label htmlFor="f-org">Organisation</label><span className="ul"></span></div>
      <div className="field sel">
        <select
          id="f-country"
          value={countryCode}
          autoComplete="country"
          onChange={(e) => {
            setCountryCode(e.target.value);
            setRegion('');
            setLocation('');
            setDial(e.target.value);
          }}
        >
          {LIST.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
        <label htmlFor="f-country">Country</label><span className="ul"></span>
      </div>
      {regions ? (
        <div className="field sel">
          <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Select…</option>
            {regions.list.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <label htmlFor="f-region">{regions.label}</label><span className="ul"></span>
        </div>
      ) : (
        <div className="field">
          <input id="f-region" value={region} onChange={(e) => setRegion(e.target.value)} placeholder=" " autoComplete="address-level1" />
          <label htmlFor="f-region">State / Province / Region</label><span className="ul"></span>
        </div>
      )}
      <LocationField value={location} onChange={setLocation} countryCode={countryCode} region={region} onRegion={setRegion} />
      <div className="field sel">
        <select id="f-type" name="enquiryType" defaultValue="">
          <option value="">Select…</option>
          {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <label htmlFor="f-type">Enquiry type</label><span className="ul"></span>
      </div>
      <div className="chips" role="group" aria-label="Sector (choose any that apply)">
        {SECTOR_CHIPS.map((s) => (
          <button key={s} type="button" className={sectors.includes(s) ? 'chip on' : 'chip'} aria-pressed={sectors.includes(s)} onClick={() => setSectors((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))}>{s}</button>
        ))}
      </div>
      <div className="field full"><textarea id="f-msg" name="message" placeholder=" " rows={1} onInput={autosize} required></textarea><label htmlFor="f-msg">Project details</label><span className="ul"></span></div>
      <p className="fnote">Have site plans or reports? We’ll send you a secure link to upload them once we’ve been in touch.</p>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I agree to Geoporte collecting and using my details to respond to this enquiry, in line with our <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</span>
      </label>
      {/* Label pre-wrapped in .roll so the page script's text-roll effect leaves this React-managed button alone */}
      <button className="pill pill-a" type="submit" disabled={sending}><span className="roll"><span data-t="Send enquiry">Send enquiry</span></span> <Arrow /></button>
      <p className={status.type ? `fmsg ${status.type}` : 'fmsg'} id="fmsg" role="status">{status.text}</p>
    </form>
  );
}
