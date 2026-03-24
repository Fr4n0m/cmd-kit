/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
}

declare module "*.svg?raw" {
  const content: string;
  export default content;
}
