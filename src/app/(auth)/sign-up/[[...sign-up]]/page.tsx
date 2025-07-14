"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false);

  // Detect mobile device and LinkedIn WebView
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
      
      // Check if it's LinkedIn's WebView
      const isLinkedInWebView = /LinkedIn/.test(userAgent) && isMobileDevice;
      setShowLinkedInWarning(isLinkedInWebView);
    };

    checkMobile();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session && !hasRedirected.current) {
          hasRedirected.current = true;
          
          // Get intended destination from URL params
          const urlParams = new URLSearchParams(window.location.search);
          const intendedDestination = urlParams.get('redirectTo') || '/dashboard';
          
          if (isMobile) {
            // For mobile devices, use window.location.href
            window.location.href = intendedDestination;
          } else {
            // For desktop, use Next.js router
            router.push(intendedDestination);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [isMobile, router]);

  const handleOpenInBrowser = () => {
    // Ensure we're redirecting to heroservices.ai domain
    const currentUrl = window.location.href;
    const heroServicesUrl = currentUrl.replace(window.location.hostname, 'heroservices.ai');
    
    // For mobile devices, use a more direct approach
    if (isMobile) {
      // Try to open in default browser using location.href
      // This should force the device to open in the default browser
      window.location.href = heroServicesUrl;
    } else {
      // For desktop, use window.open
      window.open(heroServicesUrl, '_blank');
    }
  };

  if (showLinkedInWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="glass-effect rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">LinkedIn Browser Detected</h2>
            <p className="text-blue-200 mb-6">
              To sign up securely, please open this link in your default browser instead of LinkedIn&apos;s in-app browser.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleOpenInBrowser}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Open in Safari/Chrome
            </button>
            
            <button
              onClick={() => setShowLinkedInWarning(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Continue Anyway (May Not Work)
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            This ensures a secure authentication experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 max-w-md w-full border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join HERO.AI</h1>
          <p className="text-blue-200">Create your account to start building your resume</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
          redirectTo={typeof window !== 'undefined' ? window.location.origin : ''}
        />
      </div>
    </div>
  );
} 