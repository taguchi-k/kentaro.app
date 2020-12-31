const { config } = require("process");

module.exports = {
  images: {
    domains: ["www.pref.saitama.lg.jp"],
  },
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/feed.xml",
        destination: "/_next/static/feed.xml",
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        entries["./scripts/generate-rss"] = "./src/scripts/generate-rss.ts";
        return entries;
      };
    }

    return config;
  },
};
