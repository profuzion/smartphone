import type { NextConfig } from "next";

/**
 * Next 16 config.
 * - Turbopack is default. The optional raw-shader loader rule is commented out
 *   below in case we reintroduce GLSL files (we currently export shaders as TS strings).
 * - Redirects mirror the old profuzionstudio.com URL surface so inbound links
 *   to the WordPress site don't 404 after relaunch.
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Vercel-hosted case-study preview (Nature's Knoll).
      { protocol: "https", hostname: "preview-pi-azure.vercel.app" },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/drei",
      "@react-three/fiber",
      "@react-three/postprocessing",
      "gsap",
      "lenis",
      "motion",
    ],
  },

  async redirects() {
    return [
      // Legacy WordPress service slugs → new homepage anchors.
      { source: "/services/brand-design", destination: "/#brand-design", permanent: true },
      { source: "/services/website-design", destination: "/#website-design", permanent: true },
      { source: "/services/web-design", destination: "/#website-design", permanent: true },
      { source: "/services/graphic-design", destination: "/#graphic-design", permanent: true },
      { source: "/services/signage", destination: "/#signage-vehicle-wraps", permanent: true },
      { source: "/services/vehicle-wraps", destination: "/#signage-vehicle-wraps", permanent: true },
      { source: "/services/ecommerce", destination: "/#ecommerce", permanent: true },
      { source: "/services/seo", destination: "/#seo-local-search", permanent: true },
      { source: "/services/hosting", destination: "/#hosting-care", permanent: true },
      { source: "/services/photography", destination: "/#photography-video", permanent: true },
      /**
       * /work (index) still redirects to the homepage work block.
       * /work/:slug is an actual dynamic route (src/app/work/[slug])
       * and must NOT be caught here — only the bare /work path is.
       */
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/portfolio", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },

  // Uncomment when/if we switch shaders to real .glsl files.
  // turbopack: {
  //   rules: {
  //     "*.{glsl,vs,fs,vert,frag}": { loaders: ["raw-loader"], as: "*.js" },
  //   },
  // },
};

export default nextConfig;
