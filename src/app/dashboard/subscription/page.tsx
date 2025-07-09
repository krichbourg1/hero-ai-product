"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Check, CreditCard } from 'lucide-react';

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
      'Create unlimited resumes',
      'Premium templates',
      'Export to multiple formats',
      'Priority support',
      'AI-powered suggestions',
      'Custom branding'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    features: [
      'All Professional features',
      'Team collaboration',
      'Custom domain',
      'API access',
      'Dedicated support',
      'Custom integrations'
    ]
  }
];

export default function SubscriptionPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // TODO: Implement subscription functionality
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setIsProcessing(false);
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
                disabled={isProcessing}
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
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Subscribe Now
                  </>
                )}
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