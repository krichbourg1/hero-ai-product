export interface SubscriptionTier {
  id: string;
  name: string;
  maxResumes: number;
  price?: number;
  features: string[];
}

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  free: {
    id: 'free',
    name: 'Free',
    maxResumes: 1,
    price: 0,
    features: [
      '1 Resume',
      'Basic Templates',
      'Standard Support'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    maxResumes: 10,
    price: 9.99,
    features: [
      '10 Resumes',
      'Premium Templates',
      'Priority Support',
      'Export Options',
      'Advanced Customization'
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    maxResumes: -1, // Unlimited
    price: 29.99,
    features: [
      'Unlimited Resumes',
      'All Templates',
      '24/7 Support',
      'Team Management',
      'API Access',
      'White-label Options'
    ]
  }
};

// Get user's subscription tier (defaults to free)
export function getUserSubscriptionTier(): SubscriptionTier {
  // For now, all users get free tier
  // In a real app, this would check against a database
  // New users who haven't selected a tier yet will default to free
  return SUBSCRIPTION_TIERS.free;
}

// Check if user can create a new resume
export function canCreateResume(userId: string, currentResumeCount: number): boolean {
  const tier = getUserSubscriptionTier();
  
  if (tier.maxResumes === -1) {
    return true; // Unlimited
  }
  
  return currentResumeCount < tier.maxResumes;
}

// Check if user has completed onboarding (selected a subscription tier)
export function hasCompletedOnboarding(): boolean {
  // For now, assume all users have completed onboarding
  // In a real app, this would check if the user has selected a subscription tier
  return true;
}

// Get upgrade message for user
export function getUpgradeMessage(userId: string, currentResumeCount: number): string {
  const tier = getUserSubscriptionTier();
  
  if (tier.maxResumes === -1) {
    return ''; // No upgrade needed
  }
  
  if (currentResumeCount >= tier.maxResumes) {
    return `You've reached your limit of ${tier.maxResumes} resume${tier.maxResumes > 1 ? 's' : ''} on the ${tier.name} plan. Upgrade to create more resumes!`;
  }
  
  return '';
}

// Get remaining resumes count
export function getRemainingResumes(userId: string, currentResumeCount: number): number {
  const tier = getUserSubscriptionTier();
  
  if (tier.maxResumes === -1) {
    return -1; // Unlimited
  }
  
  return Math.max(0, tier.maxResumes - currentResumeCount);
} 