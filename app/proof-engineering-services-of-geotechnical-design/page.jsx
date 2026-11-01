import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/geotechnical';
import SideNav from '@/components/SideNav';
import OneTeamBand from '@/components/OneTeamBand';
import { Arrow } from '@/components/icons';
import '@/styles/pages.css';

export const metadata = pageMeta({
  title: 'Geotechnical Proof Engineering & Design Review | Geoporte',
  description:
    'Independent proof engineering and review of geotechnical designs for buildings, roads, bridges, deep tunnels and ventilation shafts, delivered collaboratively.',
  path: '/proof-engineering-services-of-geotechnical-design',
  image: 'https://geoporte.com.au/images/real/team-meeting.jpg',
});

export default function Page() {
  return (
    <Site section="services" current="proof-engineering-services-of-geotechnical-design">
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/team-meeting.jpg" alt="Geoporte engineers in a project meeting" />
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle" className="h1-sm">
              <span className="line">
                <span>Proof Engineering</span>
              </span>
              <span className="line">
                <span className="a">of Geotechnical Design</span>
              </span>
            </h1>
          </div>
          <div className="phero-side" id="pSide">
            <p>Independent review and proof engineering of designs, confirming technical accuracy and competence.</p>
            <a href="/contact-us" className="pill pill-a magnetic">
              Contact us <Arrow />
            </a>
          </div>
        </div>
      </section>
      {/* INTRO */}
      <section className="intro" id="intro">
        <div className="wrap i-grid">
          <div className="i-copy">
            <div className="sec-head">
              <div className="cap">Geotechnical Engineering</div>
              <h2 className="split">Proof Engineering Services</h2>
            </div>
            <p className="big rv">
              As projects become more complex, independent review and proof engineering of designs and confirmation of{' '}
              <em>technical accuracy and competence</em> becomes more important to the success of projects.
            </p>
            <div className="i-meta rv">
              <span>Independent review</span>
              <span>Detailed &amp; temporary works</span>
              <span>Roads, bridges &amp; tunnels</span>
            </div>
          </div>
          <div className="i-media" id="iMedia">
            <img src="/images/real/model-metro-station.jpg" alt="3D finite element models of an underground metro station" loading="lazy" />
            <span className="lab">
              <b>Geoporte</b> · Geotechnical
            </span>
          </div>
        </div>
      </section>
      {/* ARTICLE */}
      <section className="art" id="article">
        <div className="wrap a-grid">
          <div className="a-body">
            <div className="sec-head">
              <div className="cap">Our approach</div>
              <h2 className="split">Independent review that adds value.</h2>
            </div>
            <p className="rv">
              Working collaboratively, we draw on our past detailed design, temporary works and complex geotechnical experience, always
              seeking to develop best for project outcomes.
            </p>
            <p className="rv">
              Our philosophy is to respect the required role independently, yet add value wherever a positive impact to the overall project
              can be made. Geoporte brings best practice technical knowledge, combined with local delivery experience to appreciate the
              challenges outside of the direct technical solution.
            </p>
            <p className="rv">
              We recognise the importance of delivering on program which often requires seeking early agreement with the designers and
              construction teams to resolve issues that arise during the proof engineering process.
            </p>
            <p className="rv a-note">
              Geoporte has the capability to provide proof engineering review to all aspects of civil design from{' '}
              <em>building projects, roads and bridges</em> to <em>deep tunnels and their associated ventilation shafts</em>.
            </p>
          </div>
          <SideNav group="geotechnical" current="proof-engineering-services-of-geotechnical-design" />
        </div>
      </section>
      {/* ONE TEAM */}
      <OneTeamBand />
      <PageScript />
    </Site>
  );
}
