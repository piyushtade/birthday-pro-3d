/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "/birthday-pro-3d" : "",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
