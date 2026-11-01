import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/publications';
import { ArrowDown, Close } from '@/components/icons';
import '@/styles/pages.css';

export const metadata = pageMeta({
  title: 'Publications & Technical Papers | Geoporte',
  description:
    'Conference presentations and technical papers by Geoporte specialists on digital transformation in geotechnics and tunnelling projects in Melbourne.',
  path: '/publications',
  image: 'https://geoporte.com.au/images/real/state-library-talk.jpg',
});

export default function Page() {
  return (
    <Site section="publications"
      after={
        <>
          <div className="viewer" id="viewer" role="dialog" aria-label="Publication page" aria-hidden="true">
            <span className="vcap" id="vCap" />
            <img id="vImg" alt="" />
            <button className="vx" id="vx" aria-label="Close">
              <Close />
            </button>
          </div>
        </>
      }
    >
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/state-library-talk.jpg" alt="Geoporte Managing Director presenting at State Library Victoria" style={{ objectPosition: '50% 8%' }} />
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle">
              <span className="line">
                <span>Publications</span>
              </span>
              <span className="line">
                <span>
                  &amp; <span className="a">Papers</span>
                </span>
              </span>
            </h1>
          </div>
          <div className="phero-side" id="pSide">
            <p>Technical papers and conference presentations by Geoporte specialists on digital geotechnics and tunnel engineering.</p>
            <a href="#pubs" className="pill pill-o magnetic">
              Read publications <ArrowDown />
            </a>
          </div>
        </div>
      </section>
      {/* PUBLICATIONS */}
      <section className="pubs" id="pubs">
        <div className="wrap">
          <div className="pubs-head">
            <div className="sec-head">
              <div className="cap">Publications</div>
              <h2 className="split">Sharing what we learn on the ground.</h2>
            </div>
            <p className="rv">Click any page to view it full size.</p>
          </div>
          <article className="pub fit" id="pub1">
            <div className="pub-media">
              <button
                className="doc"
                data-view="images/pub-digital-transformation.jpg"
                data-cap="Challenges to Digital Transformation in Geotechnical Engineering"
              >
                <img
                  src="/images/pub-digital-transformation.jpg"
                  alt="Title slide: Challenges to Digital Transformation in Geotechnical Engineering, 2022 AGS Victoria Symposium"
                  width="1024"
                  height="724"
                  loading="lazy"
                />
                <span className="zoom">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-4-4M11 8v6M8 11h6" />
                    </svg>
                  </i>
                  View full size
                </span>
              </button>
            </div>
            <div className="pub-copy">
              <span className="pub-num">01</span>
              <div className="pub-meta">
                <span className="ptype">Conference presentation</span>
                <span className="pdate">26 October 2022</span>
              </div>
              <span className="event">2022 AGS Victoria Symposium · Digital Geotechnics</span>
              <h3>Challenges to Digital Transformation in Geotechnical Engineering</h3>
              <div className="authors">
                <span className="author">
                  <i>QH</i>Qaiser Hayat
                </span>
                <span className="author">
                  <i>JM</i>Jack W Muir
                </span>
                <span className="author">
                  <i>HN</i>Hamish E Nelson
                </span>
              </div>
              <p className="cred">
                Presented by <b>Qaiser Hayat</b>, MSc, DIC, CPEng (Aus and NZ), CEng (UK), PE (US)
              </p>
              <p className="desc">
                Presented at the Australian Geomechanics Society Victorian Symposium, “Digital Geotechnics”, held in Melbourne.
              </p>
            </div>
          </article>
          <article className="pub rev" id="pub2">
            <div className="pub-media">
              <button
                className="doc"
                data-view="images/pub-melbourne-tunnels.jpg"
                data-cap="Technical Assessment of New Developments’ Impact on Historical and Recent Tunnels in Melbourne"
              >
                <img
                  src="/images/pub-melbourne-tunnels.jpg"
                  alt="First page of the paper: Technical Assessment of New Developments’ Impact on Historical and Recent Tunnels in Melbourne"
                  width="724"
                  height="1024"
                  loading="lazy"
                />
                <span className="zoom">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-4-4M11 8v6M8 11h6" />
                    </svg>
                  </i>
                  View full size
                </span>
              </button>
            </div>
            <div className="pub-copy">
              <span className="pub-num">02</span>
              <div className="pub-meta">
                <span className="ptype">Technical paper</span>
                <span className="pdate">Melbourne, Australia</span>
              </div>
              <span className="event">Tunnels · Urban development</span>
              <h3>Technical Assessment of New Developments’ Impact on Historical and Recent Tunnels in Melbourne</h3>
              <div className="authors">
                <span className="author">
                  <i>LY</i>L. Yang
                </span>
                <span className="author">
                  <i>AB</i>A.L. Bennett
                </span>
                <span className="author">
                  <i>QH</i>Q. Hayat
                </span>
              </div>
              <p className="desc">
                In urban areas, an increasingly common and necessary solution for creating new transport infrastructure is through the use
                of tunnels. This paper looks at the way development has occurred around infrastructure in Melbourne and the different ways
                that this has been accounted for in the design of the tunnels themselves.
              </p>
              <details className="abs">
                {' '}
                <summary>
                  Read full abstract{' '}
                  <span className="ring">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="in">
                  <p>
                    A systematic approach to assessing the risks posed by developments around tunnels and its assets has been developed,
                    working within various legislated or planning frameworks relevant to Melbourne. This paper looks at the approaches taken
                    in the design of historical and recent tunnels and how these affect the assessments. Older Melbourne rail tunnels were
                    typically designed for the existing conditions, while the design of recent tunnels has incorporated allowances for
                    additional loading that could occur from possible future building development. These design approaches affect the way
                    that the assessments can be carried out. In the former case, assessments are essentially made on first principles basis,
                    confirming that the additional loading is within the capacity of the tunnel structures. This often requires obtaining
                    and interpreting the structural design information and conducting structural modelling. For the more recent tunnel
                    designs, a phased assessment process becomes possible with a first pass comparing the effects of development loadings
                    with the design allowances. Only in cases where the development effects exceed allowances, would it become necessary to
                    conduct analyses estimating the current loadings in the tunnel, adding the development effects, and assessing whether
                    these in combination are acceptable.
                  </p>
                  <p>
                    Finally, the paper considers some of the measures used to monitor the effects of developments when the assessments
                    require additional validation including dilapidation surveys.
                  </p>
                  <p>
                    The assessment approaches in use, both for older and recent tunnels, have been effective and achievable in allowing for
                    developments around tunnels to proceed without placing tunnel infrastructure at risk.
                  </p>
                </div>
              </details>
              <div className="kw">
                <span>Historical Tunnels</span>
                <span>Recent Tunnels</span>
                <span>Change Allowances</span>
                <span>Monitoring</span>
                <span>Melbourne</span>
                <span>New Development</span>
                <span>Ground Conditions</span>
              </div>
            </div>
          </article>
        </div>
      </section>
      {/* SYMPOSIUM PREFACE */}
      <section className="preface" id="preface">
        <div className="wrap pf-grid">
          <div className="pf-copy">
            <div className="sec-head">
              <div className="cap">2022 AGS Victorian Symposium</div>
              <h2 className="split">Digital Geotechnics</h2>
            </div>
            <blockquote className="rv">
              <p>
                The Victorian Chapter of the Australian Geomechanics Society (AGS) is pleased to announce the 2022 AGS Victorian Symposium
                titled “Digital Geotechnics” to be held on 26 October 2022.
              </p>
              <p>
                This symposium seeks to provide the geo-profession with insight into the world of digital engineering and will bring
                together practitioners, researchers, contractors and subject matter experts to share and discuss their expertise on the
                topic of digital engineering and its application to geotechnical engineering and engineer geology. Best practices, case
                histories and innovative methods adopted in the field of digital engineering will be presented and discussed.
              </p>
            </blockquote>
            <cite className="rv">From the symposium preface · © 2022 Australian Geomechanics Society</cite>
          </div>
          <div className="pf-media" id="pfMedia">
            <button className="doc" data-view="images/pub-ags-preface.jpg" data-cap="2022 AGS Victorian Symposium · Preface">
              <img
                src="/images/pub-ags-preface.jpg"
                alt="Preface page of the 2022 AGS Victorian Symposium, Digital Geotechnics"
                width="688"
                height="1024"
                loading="lazy"
              />
              <span className="zoom">
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-4-4M11 8v6M8 11h6" />
                  </svg>
                </i>
                View full size
              </span>
            </button>
          </div>
        </div>
      </section>
      <PageScript />
    </Site>
  );
}
