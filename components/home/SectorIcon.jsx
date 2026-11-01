const PATHS = {
  transport: <><path d="M3 22h26M6 22c0-6 4.5-10 10-10s10 4 10 10" /><path d="M10 22v-6.5M16 22v-10M22 22v-6.5M3 27h26" /></>,
  building: <><path d="M6 28V6h12v22M18 12h8v16M4 28h24" /><path d="M10 10h4M10 15h4M10 20h4M22 17h0M22 22h0" /></>,
  water: <><path d="M16 4c5 6 8 10 8 14a8 8 0 0 1-16 0c0-4 3-8 8-14z" /><path d="M12 19a4 4 0 0 0 4 4" /></>,
  marine: <><circle cx="16" cy="7" r="2.5" /><path d="M16 9.5V27M11 14h10M6 18c0 5 4.5 9 10 9s10-4 10-9M6 18l-2 2M6 18l2 2M26 18l-2 2M26 18l2 2" /></>,
  energy: <><path d="M18 3L8 18h7l-2 11 11-16h-7z" /></>,
};

// Line icons for the home-page sector cards, drawn to match ServiceIcon.
export default function SectorIcon({ name }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  );
}
