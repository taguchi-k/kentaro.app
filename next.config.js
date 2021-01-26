const { config } = require("process");

module.exports = {
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/feed.xml",
        destination: "/_next/static/feed.xml",
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
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        entries["./scripts/generate-rss"] = "./scripts/generate-rss.ts";
        return entries;
      };
    }

    return config;
  },
};
