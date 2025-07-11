"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase, getRedirectUrl } from '@/lib/supabaseClient';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get the redirect URL and log it for debugging
  const redirectUrl = getRedirectUrl();
  console.log('SignInPage redirect URL:', redirectUrl);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
      console.log('Mobile device detected:', isMobileDevice);
      console.log('User agent:', userAgent);
    };
    checkMobile();
  }, []);

  // Handle successful authentication
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change event:', event, 'Session:', !!session);
      console.log('Is mobile:', isMobile);
      
      if (event === 'SIGNED_IN' && session && !hasRedirected.current) {
        hasRedirected.current = true;
        
        // Get the intended destination from localStorage
        const intendedDestination = localStorage.getItem('intendedDestination');
        console.log('Auth state changed - intended destination:', intendedDestination);
        
        if (intendedDestination) {
          // Clear the stored destination
          localStorage.removeItem('intendedDestination');
          console.log('Redirecting to:', intendedDestination);
          
          // Use setTimeout to ensure the redirect happens after the current execution
          setTimeout(() => {
            router.push(intendedDestination);
          }, 100);
        } else {
          console.log('No intended destination, going to dashboard');
          setTimeout(() => {
            router.push('/dashboard');
          }, 100);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        hasRedirected.current = false;
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1b] via-[#1a1f35] to-[#0a0c1b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to HERO.AI
          </h1>
          <p className="text-gray-400">
            Sign in to build your professional resume
          </p>
          {isMobile && (
            <p className="text-sm text-yellow-400 mt-2">
              Mobile device detected - Using optimized authentication
            </p>
          )}
        </div>

        {/* Error Message */}
        {authError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{authError}</p>
            <button 
              onClick={() => setAuthError(null)}
              className="text-red-300 text-xs mt-2 hover:text-red-200"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Auth Container */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          <Auth 
            supabaseClient={supabase}
            redirectTo={redirectUrl}
            queryParams={{
              access_type: 'offline',
              prompt: 'consent',
            }}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#10b981', // emerald-500
                    brandAccent: '#059669', // emerald-600
                    brandButtonText: '#ffffff',
                    defaultButtonBackground: '#374151', // gray-700
                    defaultButtonBackgroundHover: '#4b5563', // gray-600
                    defaultButtonBorder: '1px solid #6b7280', // gray-500
                    defaultButtonText: '#ffffff',
                    dividerBackground: '#374151', // gray-700
                    inputBackground: '#1f2937', // gray-800
                    inputBorder: '1px solid #4b5563', // gray-600
                    inputBorderHover: '1px solid #6b7280', // gray-500
                    inputBorderFocus: '1px solid #10b981', // emerald-500
                    inputText: '#ffffff',
                    inputLabelText: '#d1d5db', // gray-300
                    inputPlaceholder: '#9ca3af', // gray-400
                    messageText: '#d1d5db', // gray-300
                    messageTextDanger: '#f87171', // red-400
                    anchorTextColor: '#10b981', // emerald-500
                    anchorTextHoverColor: '#34d399', // emerald-400
                  },
                  space: {
                    inputPadding: '12px 16px',
                    buttonPadding: '12px 16px',
                  },
                  fonts: {
                    bodyFontFamily: 'Inter, system-ui, sans-serif',
                    buttonFontFamily: 'Inter, system-ui, sans-serif',
                    inputFontFamily: 'Inter, system-ui, sans-serif',
                    labelFontFamily: 'Inter, system-ui, sans-serif',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
              className: {
                anchor: 'text-emerald-500 hover:text-emerald-400 transition-colors',
                button: 'bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all duration-200 transform hover:scale-105',
                container: 'space-y-6',
                divider: 'bg-gray-700',
                input: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500',
                label: 'text-gray-300 font-medium',
                loader: 'text-emerald-500',
                message: 'text-gray-300',
              },
            }}
            providers={['google']}
            // Remove redirectTo to handle redirect manually
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-emerald-500 hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-emerald-500 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 