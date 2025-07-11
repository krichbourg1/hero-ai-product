"use client";

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, User, CreditCard, Menu, LogOut, Home, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const sidebarItems = [
  {
    title: 'Back to Homepage',
    href: '/',
    icon: Home
  },
  {
    title: 'My Resumes',
    href: '/dashboard',
    icon: FileText
  },
  {
    title: 'My Information',
    href: '/dashboard/information',
    icon: User
  },
  {
    title: 'Subscription',
    href: '/dashboard/subscription',
    icon: CreditCard
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  // Handle scroll for mobile navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleNavigation = (href: string) => {
    if (href === pathname) return; // Don't navigate if already on the page
    
    setActiveNavItem(href);
    startTransition(() => {
      router.push(href);
    });
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c1b]">
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0a0c1b]/90 rounded-lg p-4 flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-white animate-spin" />
            <span className="text-white">Loading...</span>
          </div>
        </div>
      )}

      {/* Mobile Top Navigation Bar - Disappears when scrolling */}
      <div className={`
        lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out
        ${isScrolled ? '-translate-y-full' : 'translate-y-0'}
        bg-gradient-to-r from-[#0a0c1b] via-[#1a1f35] to-[#0a0c1b] shadow-2xl border-b-2 border-emerald-500/30
        backdrop-blur-md
      `}>
        <div className="flex items-center justify-between px-4 py-4">
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-300 to-emerald-400 drop-shadow-lg"
          >
            HERO.AI
          </Link>
          <button
            className="p-3 bg-emerald-600/20 rounded-xl border-2 border-emerald-500/40 transition-all duration-200 hover:bg-emerald-600/30 hover:border-emerald-400/60 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-5 h-5 text-emerald-300" />
          </button>
        </div>
      </div>



      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 w-64 bg-gradient-to-b from-[#1a1f35]/95 to-[#0a0c1b]/95 border-r-2 border-emerald-500/30 backdrop-blur-md shadow-2xl
        lg:top-0
        ${isScrolled ? 'top-0' : 'top-16 lg:top-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo - Hidden on mobile since we have top bar */}
          <div className="h-16 flex items-center px-6 border-b border-white/10 lg:flex hidden">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 hover:opacity-80 transition-opacity"
            >
              HERO.AI
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const isLoading = isPending && activeNavItem === item.href;
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  disabled={isLoading || isActive}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform
                    ${isActive 
                      ? 'bg-emerald-600/30 text-emerald-100 scale-105 shadow-lg border border-emerald-500/40' 
                      : 'text-gray-300 hover:text-white hover:bg-emerald-600/20 hover:scale-102 hover:border hover:border-emerald-500/30'
                    }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  ) : (
                    <item.icon className="w-5 h-5 mr-3" />
                  )}
                  {item.title}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-emerald-500/20">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 transition-all duration-200 hover:bg-emerald-600/30 hover:border-emerald-400/50">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email || 'My Account'}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-emerald-500/20 p-4">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-600/20 hover:border hover:border-red-500/30 rounded-xl transition-all duration-200 transform hover:scale-102"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}
        lg:pt-0
        ${isScrolled ? 'pt-0' : 'pt-16 lg:pt-0'}
      `}>
        <div className={`
          min-h-screen transition-opacity duration-200
          ${isPending ? 'opacity-75' : 'opacity-100'}
        `}>
          {children}
        </div>
      </main>

      {/* Prefetch links for faster navigation */}
      <div className="hidden">
        {sidebarItems.map((item) => (
          <Link key={`prefetch-${item.href}`} href={item.href} prefetch={true} />
        ))}
      </div>
    </div>
  );
} 