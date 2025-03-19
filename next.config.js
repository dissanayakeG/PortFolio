/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // domains: ['localhost'],
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: '**',
        //   },
        // ],
    },
    typescript: {
        // Set this to false if you want production builds to abort if there's type errors
        // ignoreBuildErrors: process.env.NODE_ENV === 'development',
    },
}

module.exports = nextConfig