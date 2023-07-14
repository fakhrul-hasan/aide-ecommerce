/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    experimental: { 
        esmExternals: true,
        serverActions: true,
    }
}
