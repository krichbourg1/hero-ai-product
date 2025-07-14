"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false);

  useEffect(() => {
    // Detect LinkedIn WebView
    const isLinkedInWebView = /LinkedIn/.test(navigator.userAgent) && 
                             /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
    
    if (isLinkedInWebView) {
      setShowLinkedInWarning(true);
    }
  }, []);

  const handleOpenInBrowser = () => {
    // Open the current URL in the default browser
    const currentUrl = window.location.href;
    window.open(currentUrl, '_system');
  };

  if (showLinkedInWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-yellow-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Open in Browser</h2>
          <p className="text-blue-200 mb-6">
            To sign in securely, please open this link in your default browser instead of LinkedIn&apos;s in-app browser.
          </p>
          <button
            onClick={handleOpenInBrowser}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full mb-4"
          >
            Open in Default Browser
          </button>
          <button
            onClick={() => setShowLinkedInWarning(false)}
            className="text-blue-300 hover:text-blue-200 text-sm"
          >
            Continue Anyway (may not work)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to HERO.AI</h1>
          <p className="text-blue-200">Sign in to continue building your resume</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
          redirectTo={typeof window !== "undefined" ? window.location.origin : ""}
        />
      </div>
    </div>
  );
} 