import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "deploy.devtrust.cv",
            },
            {
                protocol: "https",
                hostname: "kremais-sta.gov.cv",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: `/api/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;
