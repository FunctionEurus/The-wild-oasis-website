/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // domains: ["qagvzxzgakgathejlilx.supabase.co"],
        protocol: "https",
        hostname: "qagvzxzgakgathejlilx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
