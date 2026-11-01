/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: import.meta.dirname },
  // Old static-site URLs (/about-us.html, /hero-sample-5.html) keep working and pass SEO to the new clean URLs.
  async redirects() {
    return [
      { source: '/hero-sample-5.html', destination: '/', permanent: true },
      { source: '/sectors', destination: '/', permanent: true }, // page was briefly live before Sectors was removed
      { source: '/our-team', destination: '/leadership', permanent: true }, // page renamed to Leadership
      { source: '/:slug.html', destination: '/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
