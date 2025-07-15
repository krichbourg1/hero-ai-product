"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Check, CreditCard, X } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Create 1 military resume',
      'Basic templates',
      'Export to PDF',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 9.99,
    features: [
      'Create 10 resumes',
      'AI Power transformations',
      'Priority support',
      'Premium templates',
      'Export to multiple formats',
      'Advanced customization'
    ]
  },
  {
    id: 'premium-pro',
    name: 'Premium Pro',
    price: 14.99,
    features: [
      'Create 25 resumes',
      'AI Power suggestions',
      'Job link resume tailoring',
      'Dedicated support',
      'All Professional features',
      'Resume analytics',
      'Custom branding'
    ],
    isPopular: true
  }
];

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      await supabase.auth.getUser();
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleSubscribe = async () => {
    setShowComingSoon(true);
    // Auto-hide the popup after 3 seconds
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Coming Soon!</h3>
              <button
                onClick={() => setShowComingSoon(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              This feature is coming soon! Please enjoy our free version for now.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white">
          Subscription Plans
        </h1>
        <p className="mt-2 text-gray-400">
          Choose the perfect plan for your needs
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative bg-white/5 border rounded-xl overflow-hidden transition-all
              ${plan.isPopular 
                ? 'border-emerald-500 scale-105 md:scale-110' 
                : 'border-white/10 hover:border-white/20'
              }
            `}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-bl-lg">
                Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="ml-2 text-gray-400">
                  /month
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe()}
                className={`
                  mt-8 w-full px-6 py-3 rounded-lg font-medium text-white
                  flex items-center justify-center gap-2 transition-colors
                  ${plan.isPopular
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {/* isProcessing is removed, so this button will always show "Subscribe Now" */}
                <>
                  <CreditCard className="w-5 h-5" />
                  Subscribe Now
                </>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan */}
      <div className="mt-12 max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Current Plan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300">
              You are currently on the <span className="text-white font-medium">Basic</span> plan
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Next billing date: N/A
            </p>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Manage Billing
          </button>
        </div>
      </div>
    </div>
  );
} 