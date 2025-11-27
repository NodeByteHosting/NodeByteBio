/** @type {import('next').NextConfig} */

export default {
    compress: true,
    reactStrictMode: false,
    experimental: {
        optimizePackageImports: ['cobe'],
        optimisticClientCache: true
    },
    images: {
        dangerouslyAllowSVG: true,
        deviceSizes: [320, 420, 768, 1024, 1200, 1920],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cordximg.host"
            },
            {
                protocol: "https",
                hostname: "user-images.trustpilot.com"
            },
            {
                protocol: "https",
                hostname: "source.unsplash.com"
            },
            {
                protocol: "https",
                hostname: "toxicdev.me"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders
            }
        ]
    }
}

const securityHeaders = [
    {
        key: 'X-Powered-By',
        value: 'NodeByte LTD'
    },
    {
        key: 'Powered-By',
        value: 'NodeByte LTD'
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
    },
    {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self' https://toxicdev.me;"
    }
]
