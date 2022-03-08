module.exports = {
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
      },
      {
        source: "/sitemap.xml",
        destination: "/_next/static/sitemap.xml",
      },
      {
        source: "/robots.txt",
        destination: "/_next/static/robots.txt",
      },
    ];
  },
};
