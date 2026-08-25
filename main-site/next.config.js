import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "frame-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [66, 75, 76, 80, 82, 88, 90, 94],
  },
  async rewrites() {
    return [
      {
        source: '/img/arquitetura/07_Escola/conjunto1.pdf',
        destination: '/img/arquitetura/07_Escola/base_reading/conjunto1.pdf',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');

    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/i,
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
