import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Determine the correct redirect URL based on environment
const getRedirectUrl = () => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  let redirectUrl: string;
  
  if (isDevelopment) {
    // Development environment - use localhost
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      const port = window.location.port;
      redirectUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    } else {
      redirectUrl = 'http://localhost:3001';
    }
  } else {
    // Production environment - always use the production domain
    redirectUrl = 'https://heroservices.ai';
  }
  
  // Debug logging
  console.log('Auth redirect URL:', {
    isDevelopment,
    nodeEnv: process.env.NODE_ENV,
    redirectUrl,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server-side'
  });
  
  return redirectUrl;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic session refresh
    autoRefreshToken: true,
    // Persist session in localStorage (works better on mobile)
    persistSession: true,
    // Detect session in URL (important for mobile redirects)
    detectSessionInUrl: true,
    // Flow type for mobile browsers
    flowType: 'pkce',
  },
  // Global headers for better mobile compatibility
  global: {
    headers: {
      'X-Client-Info': 'hero-ai-product',
    },
  },
});

// Export the redirect URL function for use in auth components
export { getRedirectUrl }; 