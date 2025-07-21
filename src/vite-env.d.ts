/// <reference types="vite/client" />
interface RuntimeConfig {
    VITE_API_URL: string;
    VITE_REVERB_APP_KEY: string;
    VITE_REVERB_HOST: string;
    VITE_REVERB_PORT: number;
    VITE_REVERB_SCHEME: string;
}

interface Window {
    runtimeConfig: RuntimeConfig;
}