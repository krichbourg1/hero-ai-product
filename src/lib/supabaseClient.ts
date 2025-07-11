import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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