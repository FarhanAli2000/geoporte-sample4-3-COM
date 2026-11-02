import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/basic';
import Contact from '@/components/Contact';
import EnquiryForm from '@/components/EnquiryForm';
// import { ArrowDown } from '@/components/icons'; // used by the hidden hero button below
import '@/styles/pages.css';
import '@/styles/contact.css';

export const metadata = pageMeta({
  title: 'Contact Us | Geoporte',
  description:
    'Contact Geoporte about civil, geotechnical and structural engineering projects. Send an enquiry or reach our offices in Melbourne, Sydney, Perth, Auckland, Dubai, Nottingham, Austin and Oakville.',
  path: '/contact-us',
  image: 'https://geoporte.com.au/images/real/contact-drone-team.jpg',
});

export default function Page() {
  return (
    <Site section="contact" current="contact-us">
      {/* PAGE HERO */}
      <section className="phero" id="top">
        <div className="phero-media" id="pheroMedia">
          <img src="/images/real/contact-drone-team.jpg" alt="Drone view of two Geoporte engineers waving beside the company car on site" />
        </div>
        <div className="wrap phero-in">
          <div>
            <h1 id="pTitle">
              <span className="line">
                <span>
                  Contact <span className="a">Us</span>
                </span>
              </span>
            </h1>
          </div>
          {/* Hidden for now: hero side text + "Send an enquiry" button
          <div className="phero-side" id="pSide">
            <p>Tell us what you’re planning and the right engineer will get back to you within one business day.</p>
            <a href="#enquiry" className="pill pill-a magnetic">
              Send an enquiry <ArrowDown />
            </a>
          </div>
          */}
        </div>
      </section>
      {/* ENQUIRY */}
      <section className="enquiry" id="enquiry">
        <div className="wrap contact-grid">
          <div>
            <div className="sec-head">
              <div className="cap">Start a project</div>
              <h2 className="split">Let’s talk about your next project.</h2>
            </div>
            <p className="lead rv">
              Civil, geotechnical and structural engineering and advisory for councils, developers, contractors and infrastructure owners.
            </p>
            <ul className="e-list rv">
              <li>We reply within one business day</li>
              <li>Senior engineers involved from investigation through to construction</li>
              <li>Offices in Melbourne, Sydney, Perth, Auckland, Dubai, Nottingham, Austin and Oakville</li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>
      {/* CONTACT DETAILS + MAP */}
      <Contact map />
      <PageScript />
    </Site>
  );
}
