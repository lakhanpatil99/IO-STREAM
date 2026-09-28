/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      // Allow existing external references used by the legacy site as fallbacks.
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "jspm.edu.in" },
    ],
  },
  async redirects() {
    return [
      // Preserve legacy deep-link shapes -> new clean dynamic routes.
      { source: "/events/detail/:id", destination: "/events/:id", permanent: false },
    ];
  },
};

export default nextConfig;
