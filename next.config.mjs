/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.GUATILLA_NEXT_DIST_DIR || ".next",
  serverExternalPackages: ["@google-cloud/cloud-sql-connector"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/kaffe-guatilla-sporbarhet/**",
      },
    ],
  },
};

export default nextConfig;
