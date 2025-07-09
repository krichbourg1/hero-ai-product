"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Star, Zap, Crown, Flame, Heart } from 'lucide-react';

interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  href: string;
  badge?: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: 'military',
    title: 'Military Resume',
    description: 'Professional military resume builder with branch-specific templates and MOS optimization.',
    icon: Shield,
    features: [
      'Branch-specific templates (Army, Navy, Air Force, Marines, Coast Guard)',
      'MOS/Rate optimization',
      'Military experience formatting',
      'Security clearance highlighting',
      'Awards and decorations section'
    ],
    href: '/build-resume/military',
    badge: 'Most Popular'
  },
  {
    id: 'police',
    title: 'Police Resume',
    description: 'Specialized police resume builder with law enforcement best practices and certification tracking.',
    icon: Users,
    features: [
      'Law enforcement specific templates',
      'Certification tracking',
      'Training and qualifications section',
      'Patrol and investigative experience',
      'Community service highlighting'
    ],
    href: '/build-resume/police',
    badge: 'New'
  },
  {
    id: 'firefighter',
    title: 'Firefighter Resume',
    description: 'Specialized firefighter resume builder with emergency response and fire safety expertise.',
    icon: Flame,
    features: [
      'Fire department specific templates',
      'Emergency response experience',
      'Fire safety and prevention',
      'Equipment and training certifications',
      'Community outreach and education'
    ],
    href: '/build-resume/firefighter',
    badge: 'Coming Soon'
  },
  {
    id: 'paramedic',
    title: 'Paramedic Resume',
    description: 'Professional paramedic resume builder with medical emergency and patient care expertise.',
    icon: Heart,
    features: [
      'Emergency medical services templates',
      'Patient care and assessment',
      'Medical certifications and licenses',
      'Emergency response protocols',
      'Clinical experience tracking'
    ],
    href: '/build-resume/paramedic',
    badge: 'Coming Soon'
  }
];

export default function ServiceTypePage({ params }: { params: { serviceType: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUserId(user.id);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  const selectedService = serviceTypes.find(service => service.id === params.serviceType);

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Type Not Found</h1>
          <p className="text-gray-400 mb-6">The requested service type does not exist.</p>
          <Button onClick={() => router.push('/build-resume')}>
            Back to Resume Builder
          </Button>
        </div>
      </div>
    );
  }

  // Check if this is a "Coming Soon" service
  const isComingSoon = selectedService.badge === 'Coming Soon';

  return (
    <div className="min-h-screen bg-[#0a0c1b] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {selectedService.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {selectedService.description}
          </p>
        </div>

        {/* Service Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${
                  isComingSoon ? 'bg-orange-600/20' : 'bg-emerald-600/20'
                }`}>
                  <selectedService.icon className={`w-8 h-8 ${
                    isComingSoon ? 'text-orange-400' : 'text-emerald-400'
                  }`} />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                {selectedService.title}
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                {selectedService.description}
              </CardDescription>
              {selectedService.badge && (
                <Badge className={`mx-auto mt-2 ${
                  isComingSoon 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {selectedService.badge}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {isComingSoon ? (
                // Coming Soon Layout
                <>
                  {/* Coming Soon Message */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 border border-orange-600/30 rounded-full mb-6">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-400 font-medium">Coming Soon</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      We're Building Something Amazing
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Our specialized {selectedService.title.toLowerCase()} builder is currently in development. 
                      We're crafting the perfect templates and features to help you showcase your expertise 
                      and experience in the best possible way.
                    </p>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">What's Coming:</h3>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/build-resume')}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Back to Available Options
                    </Button>
                    <Button
                      onClick={() => router.push('/dashboard')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium"
                    >
                      Go to Dashboard
                    </Button>
                  </div>

                  {/* Notification Signup */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-600/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-5 h-5 text-orange-400" />
                      <h4 className="font-semibold text-white">Get Notified</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Be the first to know when this resume builder launches. We'll notify you as soon as it's ready!
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                // Available Service Layout
                <>
                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => router.push(selectedService.href)}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 text-lg font-medium"
                    >
                      Start Building
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/build-resume')}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Back to Options
                    </Button>
                  </div>

                  {/* Premium Features */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-600/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-semibold text-white">Premium Features</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Upgrade to unlock unlimited resumes, advanced templates, and priority support.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 