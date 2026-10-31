import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/about';
import { Arrow, ArrowDown } from '@/components/icons';
import '@/styles/about.css';

export const metadata = pageMeta({
  title: 'About Geoporte | Engineering Design Consultancy',
  description:
    'Learn about Geoporte, a multidisciplinary engineering consultancy delivering risk-based civil, geotechnical and telecom design across Australia and New Zealand.',
  path: '/about-us',
  image: 'https://geoporte.com.au/images/real/grove-of-honour-team.jpg',
});

export default function Page() {
  return (
    <Site section="about" current="about-us">
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/grove-of-honour-team.jpg" alt="Geoporte team holding the Geoporte sign on a drilling site" />
        </div>
        <div className="phero-mark" aria-hidden="true">
          Est. Melbourne · Sydney · Perth · Auckland
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle">
              <span className="line">
                <span>We Are A</span>
              </span>
              <span className="line">
                <span>
                  <span className="a">Trusted</span> Team
                </span>
              </span>
            </h1>
          </div>
          <div className="phero-side" id="pSide">
            <p>
              Geoporte provides design consultancy services mainly in the fields of Civil Engineering, Geotechnical Engineering and Telecom
              Engineering.
            </p>
            <a href="#why" className="pill pill-o magnetic">
              Why choose us <ArrowDown />
            </a>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE US */}
      <section className="why" id="why">
        <div className="wrap">
          <div className="why-head">
            <div className="sec-head">
              <div className="cap">Features and benefits</div>
              <h2 className="split">Why choose us</h2>
            </div>
            <p className="rv">Three principles shape every Geoporte design, from the first ground model to the final check.</p>
          </div>
          <div className="why-grid" id="whyGrid">
            <article className="wcard">
              <span className="ic">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4l11 4v7c0 7-5 11-11 13C10 26 5 22 5 15V8z" />
                  <path d="M11 16l3.5 3.5L21 13" />
                </svg>
              </span>{' '}
              <span className="big">01</span>
              <h3>Risk Based Design</h3>
              <p>
                Ground is full of risks and is often the cause of cost and program over-runs on construction projects. Our specialists are
                industry leaders in geotechnical risk based design and risk management on complex Civil Engineering projects around the
                world. Our designs are run by systematic risk management processes considering a wholistic risk based approach throughout
                all the project phases.
              </p>
              <span className="edge" />
            </article>
            <article className="wcard">
              <span className="ic">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4a8 8 0 0 0-5 14.2c1 .9 1.5 2 1.5 3.3V23h7v-1.5c0-1.3.5-2.4 1.5-3.3A8 8 0 0 0 16 4z" />
                  <path d="M13 27h6M16 9v5M13.5 11.5h5" />
                </svg>
              </span>{' '}
              <span className="big">02</span>
              <h3>Creativity &amp; Innovation</h3>
              <p>
                Creativity and Innovation are at the heart of developing engineering solutions at GEOPORTE. Utilising a blend of local and
                vast international experience, our specialists have the ability to think out of the box and produce cost effective and
                buildable solutions for our clients.
              </p>
              <span className="edge" />
            </article>
            <article className="wcard">
              <span className="ic">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="20" height="24" rx="2" />
                  <path d="M11 11h10M11 16h10M11 21h6" />
                  <circle cx="22" cy="22" r="4" fill="var(--card)" />
                  <path d="M20.5 22l1 1 2-2" />
                </svg>
              </span>{' '}
              <span className="big">03</span>
              <h3>Best Practice</h3>
              <p>
                Our specialists have significant local and international experience in the use of codes, standards and best practice
                guidelines. GEOPORTE utilises cutting edge digital technology and software tools to produce bespoke solutions for all our
                projects. These solutions go through rigorous checking procedures and sanity checks by our most experienced specialists.
              </p>
              <span className="edge" />
            </article>
          </div>
        </div>
      </section>
      {/* TAILORED SOLUTIONS */}
      <section className="tailored" id="tailored">
        <div className="wrap t-grid">
          <div className="t-media" id="tMedia">
            <div className="main">
              <img src="/images/real/park-site-team.jpg" alt="Geoporte engineers on a site visit" loading="lazy" />
            </div>
            <div className="sub">
              <img src="/images/real/directors-site-visit.jpg" alt="Geoporte directors on a site visit" loading="lazy" />
            </div>
            <div className="tag">
              <img src="/images/geoporte-logo.png" alt="" />
              GE<em>O</em>PORTE
            </div>
          </div>
          <div className="t-copy">
            <div className="sec-head">
              <div className="cap">Geoporte</div>
              <h2 className="split">Tailored solutions for unique requirements</h2>
            </div>
            <p className="lead rv">
              Our company specializes in providing tailored solutions for each customer’s unique requirements. The dedicated and skilled
              team at Geoporte work tirelessly to provide innovative Civil and Geotechnical design solutions that meet the unique needs and
              challenges of our clients.
            </p>
            <ul className="checks" id="checks">
              <li>
                <span className="ck">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                </span>
                Geoporte provides design consultancy services mainly in the fields of Civil Engineering and Geotechnical Engineering
              </li>
              <li>
                <span className="ck">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                </span>
                Geoporte comprises a team of Civil Engineers, Geotechnical Specialists, Numerical Analysts, Engineering Geologists,
                hydrogeologists and foundation design specialists
              </li>
              <li>
                <span className="ck">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                </span>
                Geoporte provides engineering consulting services to clients in the building, transportation, water, ports, and marine and
                energy infrastructure
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* PEOPLE & SECTORS */}
      <section className="people" id="people">
        <div className="wrap p-grid">
          <div>
            <div className="sec-head">
              <div className="cap">Our team</div>
              <h2 className="split">The specialists behind every design.</h2>
            </div>
            <p className="rv">One multidisciplinary team covering the ground, the structure and the water around it.</p>
          </div>
          <div>
            <div className="p-block">
              <h4>Disciplines</h4>
              <div className="tiles" id="tiles">
                <div className="tile">
                  <span className="n">01</span>
                  <b>Civil Engineers</b>
                </div>
                <div className="tile">
                  <span className="n">02</span>
                  <b>Geotechnical Specialists</b>
                </div>
                <div className="tile">
                  <span className="n">03</span>
                  <b>Numerical Analysts</b>
                </div>
                <div className="tile">
                  <span className="n">04</span>
                  <b>Engineering Geologists</b>
                </div>
                <div className="tile">
                  <span className="n">05</span>
                  <b>Hydrogeologists</b>
                </div>
                <div className="tile">
                  <span className="n">06</span>
                  <b>Foundation Design Specialists</b>
                </div>
              </div>
            </div>
            <div className="p-block rv">
              <h4>Sectors we serve</h4>
              <div className="chips">
                <span className="chip">Building</span>
                <span className="chip">Transportation</span>
                <span className="chip">Water</span>
                <span className="chip">Ports</span>
                <span className="chip">Marine</span>
                <span className="chip">Energy Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ONE TEAM */}
      <section className="band" id="oneteam">
        <div className="band-media" id="bandMedia">
          <video
            id="bandVideo"
            src="/videos/dusk-bridge.mp4"
            poster="/images/dusk-poster.jpg"
            muted
            playsInline
            loop
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="wrap band-in">
          <h2 id="bandTitle">
            <span className="line">
              <span>Working together</span>
            </span>
            <span className="line">
              <span>
                as <span className="a">one team!</span>
              </span>
            </span>
          </h2>
          <div className="band-side rv">
            <p>
              We believe in a One Team approach and work closely with our clients to understand their needs by putting ourselves in their
              shoes. Our vast experience of working with a range of clients and on diverse set of projects across the globe provide us with
              the unique skills and experience to help develop out of the box solutions as part of our client’s team.
            </p>
            <a href="/contact-us" className="pill pill-o magnetic">
              Work with us <Arrow />
            </a>
          </div>
        </div>
      </section>
      <PageScript />
    </Site>
  );
}
