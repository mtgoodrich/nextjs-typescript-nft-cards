/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    target: "experimental-serverless-trace",
    images: {
        domains: ["ipfs.infura.io"],
    },
    env: {
        adminUser: "0x495aa2F53670B574D81DEe47B49d5c4eb5c2a001",
        infuraId: "a01207446146422b5d2fee9e50528208",
        timerCount: 5000,
    },
};

module.exports = nextConfig;
