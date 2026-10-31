import { EMAIL, LEGAL, OFFICES, PHONES, homeLink } from '@/lib/nav';
import { Mail, Pin } from './icons';
import WorldMap from './WorldMap';

export default function Footer({ home = false }) {
  const h = (hash) => homeLink(home, hash);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid three">
          <div className="fcol rv">
            <a href={h()} className="brand"><img src="/images/geoporte-logo.png" alt="Geoporte logo" /><span>GE<em>O</em>PORTE</span></a>
            <p>Geoporte provides design consultancy services mainly in the fields of Civil Engineering, Geotechnical Engineering and Telecom Engineering.</p>
            <a className="fmail" href={'mailto:' + EMAIL}><span className="fic"><Mail /></span><span><b>{EMAIL}</b><small>We reply within 24 hours</small></span></a>
          </div>
          {/* Hidden for now: Company and Services link columns (restore SERVICES in the import above too)
          <div className="fcol rv">
            <h4>Company</h4>
            <ul>
              <li><a href={h()}>Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/our-team">Our Team</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/publications">Publications</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div className="fcol rv">
            <h4>Services</h4>
            <ul>
              {SERVICES.map(([slug, label]) => <li key={label}><a href={slug ? '/' + slug : h('#services')}>{label}</a></li>)}
            </ul>
          </div>
          */}
          <div className="fcol rv">
            <h4>Contact Us</h4>
            <ul className="fphones">
              {PHONES.map(([tel, label, country]) => <li key={tel}><a href={'tel:' + tel}><span>{label}</span><small>{country}</small></a></li>)}
            </ul>
          </div>
          <div className="fcol rv">
            <h4>Office locations</h4>
            <ul className="foffices">
              {OFFICES.map(([city, country, addr]) => (
                <li key={city}><span className="fpin"><Pin /></span><div><b>{city} <small>{country}</small></b><p>{addr}</p></div></li>
              ))}
            </ul>
            <WorldMap />
          </div>
        </div>
        <div className="bigword" id="bigword" aria-hidden="true">
          {'GEOPORTE'.split('').map((c, i) => <span key={i}>{c}</span>)}
        </div>
        <div className="fbot">
          <span>Copyright © <span id="yr">2026</span> Geoporte. All rights reserved.</span>
          <nav>{LEGAL.map(([slug, label]) => <a key={slug} href={'/' + slug}>{label}</a>)}</nav>
        </div>
      </div>
    </footer>
  );
}
