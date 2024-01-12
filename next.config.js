/** @type {import('next').NextConfig} */
//const nextConfig = {};
//module.exports = nextConfig;

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          /*
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          */
         {
          key: "CharSet",
          value: "utf-8"
         }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
