/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx' ,'ts', 'tsx'],
  reactStrictMode: false,
  images: {
      domains: ['cloudflare-ipfs.com']
  },
  output: 'standalone'
};

export default nextConfig;
