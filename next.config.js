const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = () => {
  const env = {
    API_BASE_URL: process.env.API_BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CRYPTOGRAPHIC_KEY: process.env.CRYPTOGRAPHIC_KEY,
  };
  return { env };
};

module.exports = withPlugins([withImages()], nextConfig());
