import { createProxyMiddleware } from 'http-proxy-middleware';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ssr: false,
  env:{
    NEXT_PUBLIC_UPYUN_POLICY: process.env.NEXT_PUBLIC_UPYUN_POLICY,
    NEXT_PUBLIC_UPYUN_Authorization: process.env.NEXT_PUBLIC_UPYUN_Authorization,
  },
  async rewrites() {
    return [
      {
        source: '/assets/:path*', // 匹配所有以 /api/proxy/ 开头的请求
        destination: 'http://sf8e4g81h.sabkt.gdipper.com/:path*', // 代理到目标服务器
      },
    ];
  },
};
export default nextConfig;
