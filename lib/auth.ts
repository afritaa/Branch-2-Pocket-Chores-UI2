import { createAuthClient } from '@neondatabase/neon-js/auth';

const authUrl = (import.meta as any).env?.VITE_NEON_AUTH_URL;

export const isAuthConfigured = !!authUrl;

// Fallback to a placeholder URL to prevent crashes during initialization if config is missing.
// The app should check `isAuthConfigured` and display a warning if false.
export const authClient = createAuthClient(authUrl || 'http://localhost:invalid');
