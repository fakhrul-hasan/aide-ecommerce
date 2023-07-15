/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    experimental: { 
        esmExternals: true,
        serverActions: true,
    }
}
