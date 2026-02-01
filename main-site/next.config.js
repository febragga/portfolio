import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
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
