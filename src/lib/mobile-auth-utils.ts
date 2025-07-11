// Mobile authentication utilities for better mobile Safari support

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
};

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  return /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
};

export const isMobileSafari = (): boolean => {
  return isMobileDevice() && isSafari();
};

export const getMobileAuthConfig = () => {
  const isMobile = isMobileDevice();
  const isSafariMobile = isMobileSafari();
  
  console.log('Mobile auth config:', {
    isMobile,
    isSafariMobile,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server-side'
  });
  
  return {
    isMobile,
    isSafariMobile,
    // Safari-specific settings
    safariSettings: isSafariMobile ? {
      // Force PKCE flow for better Safari compatibility
      flowType: 'pkce' as const,
      // Enable automatic token refresh
      autoRefreshToken: true,
      // Persist session in localStorage
      persistSession: true,
      // Detect session in URL
      detectSessionInUrl: true,
    } : undefined
  };
};

export const handleMobileAuthError = (error: Error): string => {
  console.error('Mobile auth error:', error);
  
  const isMobile = isMobileDevice();
  const isSafari = isMobileSafari();
  
  // Provide mobile-specific error messages
  if (isMobile) {
    if (error.message.includes('popup')) {
      return 'Authentication popup was blocked. Please allow popups for this site and try again.';
    }
    if (error.message.includes('redirect')) {
      return 'Authentication redirect failed. Please try again or use a different browser.';
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your internet connection and try again.';
    }
  }
  
  if (isSafari) {
    return 'Safari authentication issue detected. Please try refreshing the page or use a different browser.';
  }
  
  return error.message || 'Authentication failed. Please try again.';
};

export const clearMobileAuthCache = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear localStorage items that might be causing issues
    const keysToRemove = [
      'supabase.auth.token',
      'supabase.auth.expires_at',
      'supabase.auth.refresh_token',
      'intendedDestination'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Mobile auth cache cleared');
  } catch (error) {
    console.error('Error clearing mobile auth cache:', error);
  }
}; 