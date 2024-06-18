/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    NEXT_PUBLIC_UPYUN_POLICY: process.env.NEXT_PUBLIC_UPYUN_POLICY,
    NEXT_PUBLIC_UPYUN_Authorization: process.env.NEXT_PUBLIC_UPYUN_Authorization,
  }
};
export default nextConfig;
