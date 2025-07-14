"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const hasRedirected = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState('');

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
        if (event === 'SIGNED_IN' && session?.user && !session.user.email_confirmed_at) {
          setShowEmailConfirmation(true);
          setUserEmail(session.user.email || '');
        } else if (event === 'SIGNED_IN' && session && !hasRedirected.current) {
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

  const handleResendEmail = async () => {
    if (userEmail) {
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: userEmail,
        });
        
        if (error) {
          console.error('Error resending email:', error);
        } else {
          alert('Confirmation email resent! Please check your inbox.');
        }
      } catch (error) {
        console.error('Error resending email:', error);
      }
    }
  };

  if (showLinkedInWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="glass-effect rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
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

  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="glass-effect rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Check Your Email!</h2>
            <p className="text-lg text-blue-200 mb-2">
              We&apos;ve sent a confirmation link to:
            </p>
            <p className="text-xl font-semibold text-emerald-400 mb-6 break-all">
              {userEmail}
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-white font-medium mb-2">Next Steps:</p>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the confirmation link in the email</li>
                    <li>• You&apos;ll be automatically signed in</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Resend Confirmation Email
            </button>
            
            <button
              onClick={() => setShowEmailConfirmation(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Sign Up
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            Didn&apos;t receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="glass-effect rounded-lg p-8 max-w-md w-full">
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