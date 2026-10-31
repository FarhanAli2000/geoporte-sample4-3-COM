// Home page content: rendered by app/page.jsx and also used by the home script's search index.

export const SERVICE_CARDS = [
  { title: 'Civil Engineering', text: 'Practical, innovative and sustainable civil solutions.', icon: 'civil', img: '/images/real/crane-excavation-dewatering.jpg', pos: '40% 50%', href: '/civil-engineering' },
  { title: 'Design and Drafting', text: 'High-quality design, drafting and BIM support.', icon: 'design', img: '/images/service-2.jpg', pos: '50% 40%', href: '/design-and-drafting' },
  { title: 'Geotechnical Engineering', text: 'Ground knowledge for smarter decisions.', icon: 'geo', img: '/images/real/aerial-drilling-2.jpg', pos: '50% 50%' },
  { title: 'Telecom Services', text: 'Engineering support for a more connected world.', icon: 'tel', img: '/images/telecom.jpg', pos: '50% 25%', href: '/telecom-services' },
  { title: 'Structural Engineering', text: 'Safe, efficient structures built to last.', icon: 'struct', img: '/images/cable-bridge-wide.jpg', pos: '50% 40%', href: '/structural-engineering' },
  { title: 'Stormwater & Flood Modelling', text: 'Catchment, drainage and flood risk modelling.', icon: 'storm', img: '/images/dam-spillway.jpg', pos: '50% 40%', href: '/stormwater-and-flood-modelling' },
  { title: 'Project Management', text: 'Programme, cost and delivery control on site.', icon: 'pm', img: '/images/real/team-meeting.jpg', pos: '50% 40%', href: '/project-control-services' },
  { title: 'Advisory Services', text: 'Risk-based technical and transaction advice.', icon: 'adv', img: '/images/service-7.jpg', pos: '50% 50%', href: '/advisory-services' },
];

export const FEATURED_PROJECTS = [
  { title: 'Melbourne Airport', sector: 'Aviation', loc: 'VIC', img: '/images/real/airport-earthworks.jpg' },
  { title: 'City Rail Link Auckland', sector: 'Transportation', loc: 'NZ', img: '/images/hero-video-poster.jpg' },
  { title: 'Healesville–Koo Wee Rup Road Upgrade', sector: 'Transportation', loc: 'VIC', img: '/images/real/aerial-road-straight-2.jpg' },
  { title: 'AGL Torrens Island Battery Facility', sector: 'Energy Infrastructure', loc: 'SA', img: '/images/telecom.jpg' },
  { title: 'Regional Dam Spillway Upgrade', sector: 'Water', loc: 'QLD', img: '/images/dam-spillway.jpg' },
  { title: 'Cable-Stayed River Crossing', sector: 'Transportation', loc: 'NSW', img: '/images/cable-bridge.jpg' },
];

// `filter` is the matching sector tab on the Projects page: 0 Transport, 1 Built Environment, 2 Energy, Resources & Water.
export const SECTORS = [
  { title: 'Transportation', text: 'Roads, rail, bridges and airports.', img: '/images/hero-video-poster.jpg', filter: 0 },
  { title: 'Building', text: 'Structures, foundations and civil works.', img: '/images/cable-bridge-wide.jpg', filter: 1 },
  { title: 'Water', text: 'Dams, stormwater and flood resilience.', img: '/images/dam-spillway.jpg', filter: 2 },
  { title: 'Ports & Marine', text: 'Wharves, coastal and marine structures.', img: '/images/coastal-bridge.jpg', filter: 0 },
  { title: 'Energy Infrastructure', text: 'Battery, power and telecom networks.', img: '/images/telecom.jpg', filter: 2 },
];

export const pad = (n) => String(n).padStart(2, '0');

