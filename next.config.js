const withTwin = require('./withTwin.js');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
    reactStrictMode: false,
    experimental: { serverActions: true },
    typescript: { ignoreBuildErrors: true },
});
