/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-blob-store.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  webpack: (config, options) => {
    config.resolve.alias["@types"] = path.resolve(__dirname, "types");
    return config;
  },
};
   
export default nextConfig;
