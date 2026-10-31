import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/projects';
import { ArrowDown } from '@/components/icons';
import FieldGallery from '@/components/FieldGallery';
import '@/styles/projects.css';
import '@/styles/gallery.css';

export const metadata = pageMeta({
  title: 'Projects | Transport, Energy & Water | Geoporte',
  description:
    'Explore projects delivered by Geoporte specialists across transport, built environment, energy, resources and water in Australia, NZ, the UAE and the UK.',
  path: '/projects',
  image: 'https://geoporte.com.au/images/real/marine-port-aerial.jpg',
});

export default function Page() {
  return (
    <Site
      section="projects"
      beforeHeader={
        <>
          <div className="float-img" id="floatImg" />
        </>
      }
    >
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/marine-port-aerial.jpg" alt="Aerial view of a port and land reclamation project" />
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle">
              <span className="line">
                <span>Projects By</span>
              </span>
              <span className="line">
                <span>
                  Our <span className="a">Specialists</span>
                </span>
              </span>
            </h1>
          </div>
          <div className="phero-side" id="pSide">
            <p>
              GEOPORTE’s specialist staff have decades of experience in Australia, New Zealand and several other countries of the world on
              major and complex infrastructure projects.
            </p>
            <a href="#index" className="pill pill-o magnetic">
              Browse projects <ArrowDown />
            </a>
          </div>
        </div>
      </section>
      {/* STATS (counted from the project list below) */}
      <section className="stats">
        <div className="wrap stats-grid">
          <div className="stat">
            <b>
              <span className="count" id="stProjects">
                27
              </span>
            </b>
            <p>Projects by our specialists</p>
          </div>
          <div className="stat">
            <b>
              <span className="count" id="stSectors">
                3
              </span>
            </b>
            <p>Project sectors</p>
          </div>
          <div className="stat">
            <b>
              <span className="count" id="stCountries">
                7
              </span>
            </b>
            <p>Countries</p>
          </div>
          <div className="stat">
            <b>
              <span className="count" id="stRegions">
                5
              </span>
            </b>
            <p>Regions across the world</p>
          </div>
        </div>
      </section>
      {/* SECTORS */}
      <section className="sects" id="sects">
        <div className="wrap">
          <div className="sect-head">
            <div className="sec-head">
              <div className="cap">Projects by sector</div>
              <h2 className="split">Three sectors. One standard of care.</h2>
            </div>
            <p className="rv">Select a sector to filter the project index below.</p>
          </div>
          <div className="sect-grid" id="sectGrid" />
        </div>
      </section>
      {/* INDEX */}
      <section className="index" id="index">
        <div className="wrap">
          <div className="filters rv">
            <div className="fgroup">
              <small>Sector</small>
              <div className="ftabs" id="ftabs" role="group" aria-label="Filter by sector" />
            </div>
            <div className="fgroup">
              <small>Region</small>
              <div className="fregs" id="fregs" role="group" aria-label="Filter by region" />
            </div>
          </div>
          <p className="showing" id="showing" role="status" />
          <ul className="plist" id="plist" />
        </div>
      </section>
      {/* IN THE FIELD (team photos) */}
      <FieldGallery />
      {/* REACH */}
      <section className="band" id="reach">
        <div className="band-media" id="bandMedia">
          <video
            id="bandVideo"
            src="/videos/hero-bridge.mp4"
            poster="/images/hero-video-poster.jpg"
            muted
            playsInline
            loop
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="wrap band-in">
          <div>
            <h2 id="bandTitle">
              <span className="line">
                <span>Local knowledge.</span>
              </span>
              <span className="line">
                <span>
                  <span className="a">Global</span> experience.
                </span>
              </span>
            </h2>
            <p className="rv" style={{ color: 'rgba(242,240,236,.84)', fontSize: '.94rem', maxWidth: '32rem', marginTop: '24px' }}>
              Our leaders have worked on various design and construction projects in the building, transport, telecom, energy, water, and
              ports and marine sectors in Europe, Middle East, Asia, New Zealand, &amp; Australia.
            </p>
          </div>
          <div className="band-side rv">
            <ul className="regions" id="regions" />
          </div>
        </div>
      </section>
      <PageScript />
    </Site>
  );
}
