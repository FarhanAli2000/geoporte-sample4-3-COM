import { Arrow, Mail, Pin } from './icons';

// New Zealand site: the contact block lists only the Auckland office.
const EMAIL = 'enquiries@geoporte.co.nz';
const PHONES = [['+64212870714', '+64 (0) 21 28 70714', 'New Zealand']];
const OFFICES = [['Auckland', 'New Zealand', '110 Carlton Gore Road, New Market, Auckland, New Zealand 1023']];

// Contact details block, shown on the Home and Contact Us pages only; `cta` adds an "Email us" strip,
// `map` the office map.
export default function Contact({ cta = false, map = false }) {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="c-top">
          <div className="sec-head"><div className="cap">Contact us today</div><h2 className="split">Have any questions?</h2></div>
          <p className="lead rv">Geoporte provides design consultancy services mainly in the fields of Civil Engineering, Geotechnical Engineering and Telecom Engineering.</p>
        </div>
        <div className="c-grid">
          <div className="c-card rv">
            <h4>Email &amp; phone</h4>
            <a className="mail" href={'mailto:' + EMAIL}><span className="ring"><Mail /></span><span><b>{EMAIL}</b><small>We reply within 24 hours</small></span></a>
            <ul className="phones">
              {PHONES.map(([tel, label, country]) => <li key={tel}><a href={'tel:' + tel}>{label}<small>{country}</small></a></li>)}
            </ul>
          </div>
          <div className="c-card">
            <h4>Office locations</h4>
            <div className="offices" id="offices">
              {OFFICES.map(([city, country, addr]) => (
                <div className="office" key={city}><span className="ring"><Pin /></span><div><b>{city}</b><span className="cty">{country}</span><p>{addr}</p></div></div>
              ))}
            </div>
          </div>
        </div>
        {map && <div className="c-map rv" id="officeMap"></div>}
        {cta && (
          <div className="c-cta rv"><p>Tell us about your next project.</p><a href={'mailto:' + EMAIL} className="pill pill-a magnetic">Email us <Arrow /></a></div>
        )}
      </div>
    </section>
  );
}
