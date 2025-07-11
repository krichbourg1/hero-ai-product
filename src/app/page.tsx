"use client";

import { Brain, FileText, Download, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0c1b]">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1f35] to-[#0a0c1b] text-white pt-32 pb-24 mt-16">
        <div className="absolute inset-0 hero-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1b] via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                Your Military Experience,
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Translated</span> for Civilian Success
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                HERO.AI uses advanced artificial intelligence to transform your military and first responder experience into powerful civilian resumes that leading companies understand and value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/build-resume"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-emerald-500/25"
                >
                  Build Your Resume
                  <ArrowRight className="ml-2" size={24} />
                </Link>
                <Link
                  href="#success-stories"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
                >
                  View Success Stories
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                  <div className="text-sm text-blue-200">Veterans Helped</div>
                </div>
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">750+</div>
                  <div className="text-sm text-blue-200">Transformed MOS/Rates across all Branches</div>
                </div>
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
                  <div className="text-sm text-blue-200">Resumes Created</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-[#1a1f35]/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transform rotate-2 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-300 font-semibold">Military Experience</div>
                  <div className="text-emerald-400 font-semibold">Civilian Translation</div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-500/20 border border-red-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Squad Leader, 12-person infantry unit</p>
                      <p className="text-sm text-gray-400 mt-1">Led tactical operations and training</p>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Team Leadership & Project Management</p>
                      <p className="text-sm text-emerald-300 mt-1">Led 12-person team, coordinating complex operations and staff development</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-500/20 border border-red-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Combat Medic Specialist</p>
                      <p className="text-sm text-gray-400 mt-1">Emergency medical care in high-stress environments</p>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Emergency Healthcare Professional</p>
                      <p className="text-sm text-emerald-300 mt-1">Critical care expertise with proven crisis management skills</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-500/20 border border-red-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Logistics Coordinator</p>
                      <p className="text-sm text-gray-400 mt-1">Managed supply chain and equipment distribution</p>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-200 font-medium">Supply Chain Manager</p>
                      <p className="text-sm text-emerald-300 mt-1">Optimized inventory management and coordinated multi-location distribution</p>
                    </div>
                  </div>
                </div>
                
                {/* AI Translation Badge */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center mb-1">
                      <Brain className="text-blue-400 mr-2" size={16} />
                      <span className="text-gray-300 font-semibold text-sm">AI-Powered Translation</span>
                    </div>
                    <p className="text-gray-400 text-xs">Automatically converts military experience into civilian professional language</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div id="how-it-works" className="py-24 bg-gradient-to-b from-[#0a0c1b] via-[#1a1f35] to-[#0a0c1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">How HERO.AI Works</h2>
            <p className="text-xl text-blue-200">Three simple steps to your civilian career success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="glass-effect-hover rounded-xl p-8 shadow-lg">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FileText className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">1. Share Your Experience</h3>
                <p className="text-blue-200">
                  Input your military or first responder background using our guided form. Include your roles, responsibilities, and achievements.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight size={32} className="text-blue-500/50" />
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-effect-hover rounded-xl p-8 shadow-lg">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Brain className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">2. AI Translation</h3>
                <p className="text-blue-200">
                  Our AI analyzes your experience and translates it into civilian terminology that resonates with hiring managers.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight size={32} className="text-blue-500/50" />
              </div>
            </div>
            
            <div>
              <div className="glass-effect-hover rounded-xl p-8 shadow-lg">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Download className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">3. Get Your Resume</h3>
                <p className="text-blue-200">
                  Download your professionally formatted resume, optimized for ATS systems and ready to impress civilian employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div id="success-stories" className="py-24 bg-[#0a0c1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Translation Success Stories</h2>
            <p className="text-xl text-blue-200">See how HERO.AI transforms complex military experience into clear civilian language</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                role: "Former Marine Corps Squad Leader",
                current: "Resume Translation Success",
                quote: "HERO.AI perfectly translated my complex military leadership into clear civilian terms that hiring managers can understand."
              },
              {
                name: "Sarah M.",
                role: "Ex-Air Force Logistics Officer",
                current: "Experience Translation",
                quote: "The AI helped me explain my military logistics experience in ways that civilian employers actually value and understand."
              },
              {
                name: "Mike R.",
                role: "Navy Corpsman",
                current: "Skills Translation",
                quote: "HERO.AI transformed my medical military experience into civilian healthcare terminology that resonates with employers."
              }
            ].map((story, index) => (
              <div key={index} className="glass-effect rounded-xl p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                    {story.name[0]}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{story.name}</h3>
                    <p className="text-sm text-blue-200">{story.role}</p>
                    <p className="text-sm text-emerald-400">{story.current}</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">&ldquo;{story.quote}&rdquo;</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="text-emerald-400 w-5 h-5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0c1b]/80 backdrop-blur-sm text-gray-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">HERO.AI</h3>
              <p className="text-sm">
                Helping Employment for Rescuers and Operators through AI-powered career translation.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <p className="text-sm">Questions? Reach out to us at:</p>
              <p className="text-sm mt-2">heroservices.ai@gmail.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} HERO.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
