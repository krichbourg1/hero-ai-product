import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Determine the correct redirect URL based on environment
const getRedirectUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://heroservices.ai';
  }
  
  // Client-side
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Development environment
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  } else {
    // Production environment
    return 'https://heroservices.ai';
  }
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