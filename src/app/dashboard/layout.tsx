"use client";

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, User, CreditCard, Menu, X, LogOut, Home, Loader2 } from 'lucide-react';
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

      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white/5 rounded-lg border border-white/10 lg:hidden transition-all duration-200 hover:bg-white/10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 w-64 bg-white/5 border-r border-white/10 backdrop-blur-sm
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/10">
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
                    w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform
                    ${isActive 
                      ? 'bg-white/10 text-white scale-105 shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-102'
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
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 transition-all duration-200 hover:bg-white/10">
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
          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 transform hover:scale-102"
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