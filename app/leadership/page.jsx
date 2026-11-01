import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/team';
import OneTeamBand from '@/components/OneTeamBand';
import '@/styles/pages.css';

export const metadata = pageMeta({
  title: 'Leadership | Managing Director | Geoporte',
  description: 'Senior engineering leadership on every project, from first conversation to final design. Meet Geoporte’s Managing Director, Qaiser Hayat.',
  path: '/leadership',
  image: 'https://geoporte.com.au/images/real/walking-geoporte-vests.jpg',
});

export default function Page() {
  return (
    <Site section="about" current="leadership">
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/walking-geoporte-vests.jpg" alt="Geoporte engineers in branded vests walking a site" />
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle">
              <span className="line">
                <span className="a">Leadership</span>
              </span>
            </h1>
          </div>
          <div className="phero-side" id="pSide">
            <p>Senior engineering leadership on every project, from first conversation to final design.</p>
          </div>
        </div>
      </section>
      {/* TEAM GRID */}
      <section className="team" id="team">
        <div className="wrap">
          <div className="t-head">
            <div className="sec-head">
              <div className="cap">Our Team</div>
              <h2 className="split">The specialists behind every design.</h2>
            </div>
            <p className="rv">
              Chartered engineers, geologists and project professionals with experience across Australia, New Zealand, the UK, Europe, the
              Middle East and Asia.
            </p>
          </div>
        </div>
      </section>
      {/* PROFILES */}
      <section className="profiles" id="profiles">
        <div className="wrap">
          <article className="prof" id="qaiser-hayat">
            <div className="p-ph">
              <img src="/images/team/qaiser-hayat.jpg" alt="Qaiser Hayat" loading="lazy" />
                          </div>
            <div className="p-tx rv">
              <h3>Qaiser Hayat</h3>
              <p className="p-role">Managing Director</p>
              <ul className="p-cred">
                <li>
                  MSc in Soil Mechanics and Engineering Seismology, BSc in Civil Engineering (Hons), MIEAust, CPEng, NER, APEC Engineer,
                  IntPE (Australia), RPEV (Victoria), RPEQ, CEng MICE (UK), PE (ID, USA), Auckland Council Producer Statement Author
                </li>
              </ul>
              <div className="p-bio">
                <p>
                  Qaiser Hayat is a Chartered Geotechnical Engineer with 25 years of experience in the design and management of civil and
                  geotechnical engineering projects. He is Managing Director and Principal Geotechnical Engineer at Geoporte Australia. Qaiser has
                  contributed as a geotechnical engineer to major infrastructure projects in Australia, New Zealand, United Kingdom, Middle
                  East, and Asia.
                </p>
              </div>
              <h4>Specialisation</h4>
              <ul className="p-spec">
                <li>
                  Geotechnical Design for Highway, Rail, Energy, Marine, Water, and Building Infrastructure — Retaining Walls, Slope
                  Stabilisation Works, Shallow and Deep Foundations, Earthworks Design, Road Subgrade Assessment, Ground Settlement
                  Analysis, Ground Improvement
                </li>
                <li>Earthquake Geotechnical Engineering</li>
                <li>Ground Investigation Scoping, Management and Interpretation</li>
                <li>Ground Risk Management (including Ground Risk Identification and Assessment)</li>
                <li>Forensic Analysis of Geotechnical Failures</li>
                <li>Leading Multi-Disciplinary Teams on Major Infrastructure Projects</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      {/* ONE TEAM */}
      <OneTeamBand />
      <PageScript />
    </Site>
  );
}
