/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "via.placeholder.com",
            "res.cloudinary.com"
        ]
    },
    eslint: { 
        ignoreDuringBuilds: true, 
    }, 
}

module.exports = nextConfig