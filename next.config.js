/** @type {import('next').NextConfig} */
const nextConfig = {
  // Limit worker processes to prevent Jest worker errors
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      // Limit parallelism in development to prevent worker crashes
      config.parallelism = 1;
    }
    return config;
  },
  // Experimental features for better stability
  experimental: {
    // Reduce worker count
    workerThreads: false,
  },
};

module.exports = nextConfig;