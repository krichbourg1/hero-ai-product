"use client";

import { useState } from 'react';
import { X, Check, Star } from 'lucide-react';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/subscription-utils';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
}

export function UpgradeModal({ isOpen, onClose, currentTier }: UpgradeModalProps) {
  const [selectedTier, setSelectedTier] = useState('professional');

  if (!isOpen) return null;

  const handleUpgrade = (tierId: string) => {
    // In a real app, this would redirect to payment processing
    alert(`Redirecting to payment for ${SUBSCRIPTION_TIERS[tierId].name} plan...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Upgrade Your Plan
            </h2>
            <p className="text-gray-400">
              Unlock more resumes and premium features
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Current Plan */}
        <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-white font-medium">Current Plan: {currentTier.name}</span>
          </div>
          <p className="text-gray-400 text-sm">
            You can create up to {currentTier.maxResumes === -1 ? 'unlimited' : currentTier.maxResumes} resume{currentTier.maxResumes !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(SUBSCRIPTION_TIERS).map(([tierId, tier]) => {
            if (tierId === 'free') return null; // Don't show free tier in upgrade modal
            
            const isSelected = selectedTier === tierId;
            const isPopular = tierId === 'professional';
            
            return (
              <div
                key={tierId}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                  ${isSelected 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                  }
                `}
                onClick={() => setSelectedTier(tierId)}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-white mb-1">
                    ${tier.price}
                    <span className="text-lg text-gray-400 font-normal">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {tier.maxResumes === -1 ? 'Unlimited' : tier.maxResumes} resume{tier.maxResumes !== 1 ? 's' : ''}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpgrade(tierId);
                  }}
                  className={`
                    w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                    ${isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  {tierId === 'professional' ? 'Upgrade Now' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>All plans include a 30-day money-back guarantee</p>
          <p className="mt-1">Cancel anytime • No setup fees</p>
        </div>
      </div>
    </div>
  );
} 