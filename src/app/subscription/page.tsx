"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Check, Star, CreditCard, Shield } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/lib/subscription-utils';
import { Header } from '@/components/ui/header';

export default function SubscriptionPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState('free');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`);
        return;
      }
      setUser(user);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  const handleContinue = async () => {
    if (!user?.id) return;

    setIsProcessing(true);

    try {
      if (selectedTier === 'free') {
        // For free tier, add a small delay to ensure auth state is properly set
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/build-resume/military/army/details');
      } else {
        // For paid tiers, redirect to payment processing
        // In a real app, this would integrate with Stripe or another payment processor
        alert(`Redirecting to payment for ${SUBSCRIPTION_TIERS[selectedTier].name} plan...`);
        // Add a small delay to ensure auth state is properly set
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/build-resume/military/army/details');
      }
    } catch (error) {
      console.error('Error processing subscription:', error);
      alert('There was an error processing your subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect if not signed in
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-400">
              Select the plan that best fits your resume building needs
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(SUBSCRIPTION_TIERS).map(([tierId, tier]) => {
              const isSelected = selectedTier === tierId;
              const isPopular = tierId === 'premiumPro';
              
              return (
                <div
                  key={tierId}
                  className={`
                    relative p-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                    ${isSelected 
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/25' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                    }
                  `}
                  onClick={() => setSelectedTier(tierId)}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold text-white mb-1">
                      ${tier.price}
                      <span className="text-lg text-gray-400 font-normal">/month</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {tier.maxResumes === -1 ? 'Unlimited' : tier.maxResumes} resume{tier.maxResumes !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selection Indicator */}
                  <div className="flex items-center justify-center">
                    <div 
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${isSelected
                          ? 'border-emerald-500'
                          : 'border-white/30'
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Info for Paid Plans */}
          {selectedTier !== 'free' && (
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-medium text-white">Payment Information</h3>
              </div>
              <p className="text-gray-400">
                You&apos;ll be redirected to our secure payment processor to complete your subscription. 
                Your payment information will be handled securely and you can cancel anytime.
              </p>
            </div>
          )}

          {/* Free Plan Info */}
          {selectedTier === 'free' && (
            <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-medium text-white">Free Plan</h3>
              </div>
              <p className="text-gray-300">
                No payment information required. Start building your resume immediately with our free plan.
                You can upgrade to a paid plan anytime from your dashboard.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg font-medium text-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Cancel
            </button>
            
            <button
              onClick={handleContinue}
              disabled={isProcessing}
              className={`
                px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center
                transition-all duration-200 transform
                ${!isProcessing
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white/90 rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                selectedTier === 'free' ? 'Start Free Plan' : 'Continue to Payment'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 