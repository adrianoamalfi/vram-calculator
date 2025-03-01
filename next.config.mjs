// Prova a importare eventuali override da next-user.config
let userConfig = undefined;
try {
  userConfig = await import('./next-user.config');
} catch (e) {
  // ignora l'errore se il file non esiste
}

// Determina l'ambiente in base alla variabile d'ambiente
const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';
const basePath = isStaging ? '/vram-calculator/staging' : '/vram-calculator';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Impostazioni per i percorsi base in funzione dell'ambiente:
  basePath,
  assetPrefix: `${basePath}/`,
};

// Unione della configurazione utente (se presente)
mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }
  for (const key in userConfig) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
