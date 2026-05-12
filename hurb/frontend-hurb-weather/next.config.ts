import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Habilitar output standalone para Docker production
  output: 'standalone',

  // Configurar domínios permitidos para next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bing.com',
        pathname: '/th**',
      },
    ],
  },
};

export default nextConfig;
