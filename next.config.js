/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    eslint: { 
        ignoreDuringBuilds: true, 
    }, 
}

module.exports = nextConfig