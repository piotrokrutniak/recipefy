/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "via.placeholder.com"
        ]
    },
    eslint: { 
        ignoreDuringBuilds: true, 
    }, 
}

module.exports = nextConfig