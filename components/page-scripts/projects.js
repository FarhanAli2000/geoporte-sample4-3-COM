'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import usePageScript, { onLoad } from '@/lib/usePageScript';

// Ported unchanged from the original static page: scroll, cursor, nav and GSAP animations.
function init() {
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches,
    G = typeof gsap !== 'undefined',
    fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  $('#yr').textContent = new Date().getFullYear();
  const ARW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => s.replace(/&/g, '&amp;');

  /* ---------- data: geoporte.com.au/projects ---------- */
  const SECTORS = [
    ['Transport Projects', '/images/hero-video-poster.jpg'],
    ['Built Environment Projects', '/images/cable-bridge-wide.jpg'],
    ['Energy, Resources & Water Projects', '/images/dam-spillway.jpg'],
  ];
  const REGION = {
    Australia: 'Australia',
    'New Zealand': 'New Zealand',
    UAE: 'Middle East',
    'Saudi Arabia': 'Middle East',
    India: 'Asia',
    Pakistan: 'Asia',
    'United Kingdom': 'United Kingdom',
  };
  // [name, location, country, sector index, preview image]
  const P = [
    ['Healesville–Koo Wee Rup Road Upgrade', 'Victoria', 'Australia', 0, '/images/real/aerial-road-straight-2.jpg'],
    ['Melbourne Airport', 'Victoria', 'Australia', 0, '/images/real/airport-earthworks.jpg'],
    ['Princess Highway East Rail Bridge', 'Victoria', 'Australia', 0, '/images/cable-bridge.jpg'],
    ['Airport East Precinct', 'Sydney, NSW', 'Australia', 0, '/images/geotech-wide.jpg'],
    ['Te Ahu a Tūranga Manawatū Highway', 'North Island', 'New Zealand', 0, '/images/real/aerial-road-rail-bridge.jpg'],
    ['City Rail Link (CRL)', 'Auckland', 'New Zealand', 0, '/images/hero-video-poster.jpg'],
    ['Etihad Rail', 'Abu Dhabi', 'UAE', 0, '/images/real/mountain-rock-cut.jpg'],
    ['Dubai Metro Extension', 'Dubai', 'UAE', 0, '/images/cable-bridge-wide.jpg'],
    ['Dubai Water Canal', 'Dubai', 'UAE', 0, '/images/real/uae-dewatering-reclamation.jpg'],
    ['Hyderabad Metro Project', 'Hyderabad', 'India', 0, '/images/hero-bridge.jpg'],
    ['Blackfriars Railway Bridge', 'London', 'United Kingdom', 0, '/images/cable-bridge.jpg'],
    ['Network Rail Osborne Station', 'Kent', 'United Kingdom', 0, '/images/sunset-bridge.jpg'],
    ['London Underground Maintenance Works', 'London', 'United Kingdom', 0, '/images/engineers.jpg'],
    ['Network Rail Silkstream Junction', 'England', 'United Kingdom', 0, '/images/hero-video-poster.jpg'],
    ['Greensborough and Frankston Car Parks', 'Melbourne, Victoria', 'Australia', 1, '/images/cable-bridge-wide.jpg'],
    ['Osborne Naval Shipbuilding Precinct', 'Adelaide, South Australia', 'Australia', 1, '/images/coastal-bridge.jpg'],
    ['Etihad Museum', 'Dubai', 'UAE', 1, '/images/service-2.jpg'],
    ['Marsa Al Seef Khor', 'Dubai', 'UAE', 1, '/images/real/uae-reclamation-crane.jpg'],
    ['Sohar Industrial Port Company (SIPC)', 'Dubai', 'UAE', 1, '/images/real/marine-port-aerial.jpg'],
    ['Dammam Industrial City 3', 'Dammam', 'Saudi Arabia', 1, '/images/real/uae-earthworks-loader.jpg'],
    ['Sarb Artificial Islands', 'Abu Dhabi', 'UAE', 1, '/images/real/breakwater-construction.jpg'],
    ['Yas Island Development', 'Abu Dhabi', 'UAE', 1, '/images/real/uae-vibro-rig.jpg'],
    ['AGL Torrens Island Battery Facility', 'Adelaide, South Australia', 'Australia', 2, '/images/telecom.jpg'],
    ['Strategic Tunnel Enhancement Programme (STEP)', 'Abu Dhabi', 'UAE', 2, '/images/geotech-site.jpg'],
    ['Pakistan Gasport Liquefied Natural Gas Berth', 'Karachi', 'Pakistan', 2, '/images/coastal-bridge.jpg'],
    ['Das Island Accommodation Project', 'Abu Dhabi', 'UAE', 2, '/images/service-7.jpg'],
    ['Hamriyah Free Zone Fuel Pipe Protection Works', 'Sharjah', 'UAE', 2, '/images/dam-spillway.jpg'],
  ];
  const regionOf = (p) => REGION[p[2]];
  const REGIONS = [...new Set(P.map(regionOf))];
  const countIn = (arr, f) => arr.filter(f).length;

  $('#stProjects').dataset.to = P.length;
  $('#stSectors').dataset.to = SECTORS.length;
  $('#stCountries').dataset.to = new Set(P.map((p) => p[2])).size;
  $('#stRegions').dataset.to = REGIONS.length;
  $$('.count').forEach((c) => (c.textContent = c.dataset.to));

  $('#sectGrid').innerHTML = SECTORS.map(
    (s, i) =>
      `<button class="scard" data-s="${i}"><div class="img"><img src="${s[1]}" alt="" loading="lazy"></div><span class="big">${i + 1}</span><h3>${esc(s[0])}</h3><div class="meta"><span>${countIn(P, (p) => p[3] === i)} projects</span><span class="ring">${ARW}</span></div><span class="edge"></span></button>`,
  ).join('');
  $('#ftabs').innerHTML =
    `<button class="tab on" data-s="-1">All<i>${P.length}</i></button>` +
    SECTORS.map(
      (s, i) => `<button class="tab" data-s="${i}">${esc(s[0].replace(' Projects', ''))}<i>${countIn(P, (p) => p[3] === i)}</i></button>`,
    ).join('');
  $('#fregs').innerHTML =
    `<button class="tab on" data-r="">All</button>` + REGIONS.map((r) => `<button class="tab" data-r="${r}">${r}</button>`).join('');
  $('#regions').innerHTML = REGIONS.map((r) => `<li><b>${r}</b><span>${pad(countIn(P, (p) => regionOf(p) === r))}</span></li>`).join('');
  $('#floatImg').innerHTML = P.map((p) => `<img src="${p[4]}" alt="">`).join('');

  /* ---------- filtering ---------- */
  let fs = -1,
    fr = '';
  const fl = $('#floatImg'),
    fimgs = $$('#floatImg img');
  function render(animate) {
    const list = P.map((p, i) => [p, i]).filter(([p]) => (fs < 0 || p[3] === fs) && (!fr || regionOf(p) === fr));
    $('#showing').innerHTML = `Showing <b>${pad(list.length)}</b> of ${pad(P.length)} projects`;
    $('#plist').innerHTML = list.length
      ? list
          .map(
            ([p, i], k) =>
              `<li><div class="prow" data-i="${i}"><span class="n">${pad(k + 1)}</span><b>${esc(p[0])}</b><span class="loc">${esc(p[1])}, ${p[2]}</span><span class="sec">${esc(SECTORS[p[3]][0].replace(' Projects', ''))}</span><span class="ring">${ARW}</span></div></li>`,
          )
          .join('')
      : '<li class="empty">No projects match this combination. Try another region.</li>';
    $$('#ftabs .tab').forEach((t) => t.classList.toggle('on', +t.dataset.s === fs));
    $$('#fregs .tab').forEach((t) => t.classList.toggle('on', t.dataset.r === fr));
    $$('.scard').forEach((c) => c.classList.toggle('on', +c.dataset.s === fs));
    $$('.prow').forEach((r) =>
      r.addEventListener('mouseenter', () => {
        const i = +r.dataset.i;
        fimgs.forEach((im, j) => im.classList.toggle('on', j === i));
        if (fine) fl.classList.add('show');
      }),
    );
    if (animate && G && !reduce)
      gsap.from('#plist li', { x: 40, opacity: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out', clearProps: 'transform,opacity' });
    if (animate && G && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }
  $('#plist').addEventListener('mouseleave', () => fl.classList.remove('show'));
  $('#ftabs').addEventListener('click', (e) => {
    const t = e.target.closest('.tab');
    if (!t) return;
    fs = +t.dataset.s;
    render(true);
  });
  $('#fregs').addEventListener('click', (e) => {
    const t = e.target.closest('.tab');
    if (!t) return;
    fr = t.dataset.r;
    render(true);
  });
  // Home-page sector rows link here as /projects?sector=N#index.
  const qs = new URLSearchParams(location.search).get('sector');
  if (qs && SECTORS[+qs]) fs = +qs;
  render(false);

  /* ---------- helpers ---------- */
  function split(el) {
    const walk = (n) => {
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              f.appendChild(document.createTextNode(' '));
              return;
            }
            const w = document.createElement('span');
            w.className = 'w';
            const i = document.createElement('span');
            i.className = 'wi';
            i.textContent = p;
            w.appendChild(i);
            f.appendChild(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) walk(c);
      });
    };
    walk(el);
    return $$('.wi', el);
  }
  const splits = $$('.split').map((el) => ({ el, words: split(el) }));
  $$('.pill').forEach((b) => {
    const tn = [...b.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    if (!tn) return;
    const t = tn.textContent.trim();
    const r = document.createElement('span');
    r.className = 'roll';
    const i = document.createElement('span');
    i.textContent = t;
    i.dataset.t = t;
    r.appendChild(i);
    tn.replaceWith(r);
    r.after(document.createTextNode(' '));
  });
  $$('.pill').forEach((p) =>
    p.addEventListener('mousemove', (e) => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--px', e.clientX - r.left + 'px');
      p.style.setProperty('--py', e.clientY - r.top + 'px');
    }),
  );

  /* ---------- lenis ---------- */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined') {
    try {
      lenis = new Lenis({ duration: 1.2 });
      if (G) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const r = (t) => {
          lenis.raf(t);
          requestAnimationFrame(r);
        };
        requestAnimationFrame(r);
      }
    } catch (e) {
      lenis = null;
    }
  }
  const go = (id) => {
    const t = id === '#top' ? document.body : $(id);
    if (!t) return;
    lenis ? lenis.scrollTo(t, { offset: -60 }) : t.scrollIntoView({ behavior: 'smooth' });
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    if (a.dataset.sector) {
      fs = +a.dataset.sector;
      render(true);
    }
    document.body.classList.remove('menu-open');
    go(id);
  });
  $('#sectGrid').addEventListener('click', (e) => {
    const c = e.target.closest('.scard');
    if (!c) return;
    const s = +c.dataset.s;
    fs = fs === s ? -1 : s;
    render(true);
    go('#index');
  });

  /* ---------- nav ---------- */
  const nav = $('#nav'),
    prog = $('#progress'),
    tt = $('#totop'),
    ring = $('#topRing');
  let lastY = 0;
  function onS() {
    const y = scrollY,
      m = document.documentElement.scrollHeight - innerHeight,
      p = m > 0 ? y / m : 0;
    nav.classList.toggle('scrolled', y > 30);
    lastY = y;
    prog.style.transform = `scaleX(${p})`;
    tt.classList.toggle('show', y > 700);
    ring.style.strokeDashoffset = 144.5 * (1 - p);
  }
  addEventListener('scroll', onS, { passive: true });
  onS();
  const links = $$('#menu > li > a'),
    ink = $('#ink'),
    here = $('#menu > li > a.active');
  const mv = (a) => {
    if (!a) return;
    ink.style.left = a.parentElement.offsetLeft + 13 + 'px';
    ink.style.width = a.offsetWidth - 26 + 'px';
  };
  links.forEach((a) => a.addEventListener('mouseenter', () => mv(a)));
  $('#menu').addEventListener('mouseleave', () => mv(here));
  setTimeout(() => mv(here), 300);
  document.fonts.ready.then(() => mv(here)); // re-measure once the web font has replaced the fallback
  addEventListener('resize', () => mv(here));
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
  });

  /* ---------- cursor + magnetic + float image ---------- */
  const cur = $('#cursor'),
    dot = $('#cursorDot');
  if (fine && !reduce) {
    let mx = -200,
      my = -200,
      cx = mx,
      cy = my,
      fx = mx,
      fy = my;
    addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    });
    (function l() {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      cur.style.transform = `translate(${cx}px,${cy}px)`;
      fx += (mx - fx) * 0.1;
      fy += (my - fy) * 0.1;
      fl.style.transform = `translate(${fx + 30}px,${fy - 105}px) rotate(${(mx - fx) * 0.04}deg)`;
      requestAnimationFrame(l);
    })();
    document.addEventListener('mouseover', (e) => cur.classList.toggle('hov', !!e.target.closest('a,button,.prow')));
    $$('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.32}px`;
      });
      el.addEventListener('mouseleave', () => (el.style.translate = ''));
    });
  }

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target,
          to = +el.dataset.to;
        if (reduce) return;
        const t0 = performance.now();
        const st = (n) => {
          const p = Math.min((n - t0) / 1800, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) requestAnimationFrame(st);
        };
        el.textContent = '0';
        requestAnimationFrame(st);
      }),
    { threshold: 0.6 },
  );
  $$('.count').forEach((c) => cio.observe(c));

  /* ---------- video ---------- */
  const bv = $('#bandVideo');
  new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        e.isIntersecting ? bv.play().catch(() => {}) : bv.pause();
      }),
    { threshold: 0.05 },
  ).observe(bv);

  /* ---------- animations ---------- */
  if (G && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .from('.nav-in > *', { y: -26, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform,opacity' })
      .from('#pheroMedia img', { scale: 1.25, duration: 2.4, ease: 'power3.out' }, 0)
      .from('#pTitle .line > span', { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.3)
      .from('#pSide', { y: 30, opacity: 0, duration: 1 }, 0.7);
    gsap.to('#pheroMedia', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true },
    });
    splits.forEach(({ el, words }) =>
      gsap.from(words, {
        yPercent: 115,
        rotate: 3,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }),
    );
    $$('.rv').forEach((el) =>
      gsap.from(el, {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      }),
    );
    $$('.sec-head .cap').forEach((c) =>
      gsap.from(c, { x: -20, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 92%' } }),
    );
    gsap.from('.stat', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.stats', start: 'top 88%' },
    });
    gsap.from('.scard', {
      y: 100,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#sectGrid', start: 'top 85%' },
    });
    gsap.from('.scard .img', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.3,
      stagger: 0.12,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: '#sectGrid', start: 'top 85%' },
    });
    gsap.from('#plist li', {
      x: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#plist', start: 'top 85%' },
    });
    gsap.fromTo(
      '#bandMedia',
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    gsap.from('#bandTitle .line > span', {
      yPercent: 110,
      skewY: 5,
      duration: 1.2,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.band', start: 'top 70%' },
    });
    if ($('#offices')) gsap.from('.office', {
      x: -40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#offices', start: 'top 88%' },
    });
    gsap.from('#bigword span', {
      yPercent: 100,
      duration: 1.3,
      stagger: 0.06,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#bigword', start: 'top 98%' },
    });
    onLoad(() => ScrollTrigger.refresh());
  }
}

export default function PageScript() {
  usePageScript(init);
  return null;
}
