import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, AlertCircle, TrendingUp, Headphones, Home, History, BarChart3, Users, User } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface MealAnalysisProps {
  analysis: any;
  onNavigate: (screen: Screen) => void;
}

export const MealAnalysis: React.FC<MealAnalysisProps> = ({ analysis, onNavigate }) => {
  // Mock data if none provided for demo
  const data = analysis || {
    dishName: "Dal Tadka + 2 Rotis",
    nutritionalScore: 8.5,
    proteinStatus: 'OK',
    fiberStatus: 'OK',
    carbQuality: 'Stable',
    suggestions: [
      "Add a side of cucumber salad for extra hydration",
      "Swap one roti for a small portion of brown rice"
    ],
    familyInsights: {
      mom: "Great balance of protein and fiber.",
      dad: "Good for sugar control, keep roti portion small.",
      child: "Excellent energy source for active play.",
      grandparent: "Easy to digest, good for gut health."
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="text-accent" size={20} />
              </div>
              <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: 'Home', icon: <Home size={18} />, screen: 'dashboard' as Screen },
                { label: 'History', icon: <History size={18} />, screen: 'history' as Screen },
                { label: 'Insights', icon: <BarChart3 size={18} />, screen: 'insights' as Screen },
                { label: 'Family', icon: <Users size={18} />, screen: 'family-setup' as Screen },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onNavigate(item.screen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm text-text-secondary hover:bg-black/5"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('settings')}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
                👩‍🍳
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Ananya</p>
                <p className="text-xs font-bold">Settings</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-16 space-y-12">
        <header className="flex items-center justify-between">
          <div className="space-y-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold">Meal Analysis</h1>
          </div>
          <div className="px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-widest">
            Analysis Complete
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Score & Dish */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
              <h2 className="text-3xl font-serif font-bold">{data.dishName}</h2>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-bg-primary" />
                  <motion.circle 
                    cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" 
                    strokeDasharray={553}
                    initial={{ strokeDashoffset: 553 }}
                    animate={{ strokeDashoffset: 553 * (1 - data.nutritionalScore / 10) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-accent" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold tracking-tighter">{data.nutritionalScore}</span>
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Score</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { label: 'Protein', status: data.proteinStatus },
                  { label: 'Fiber', status: data.fiberStatus },
                  { label: 'Carbs', status: data.carbQuality }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-accent">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions Widget */}
            <div className="bg-accent p-10 rounded-[3rem] text-white space-y-8 shadow-2xl shadow-accent/20">
              <div className="flex items-center gap-3 font-bold text-sm uppercase tracking-widest">
                <TrendingUp size={24} />
                <span>Gentle Improvements</span>
              </div>
              <ul className="space-y-6">
                {data.suggestions.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-medium leading-tight">
                    <CheckCircle2 size={24} className="shrink-0 mt-0.5 opacity-60" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Family Insights */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-serif font-bold">Insights for Everyone</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Mom', emoji: '👩', text: data.familyInsights.mom },
                { name: 'Dad', emoji: '👨', text: data.familyInsights.dad },
                { name: 'Child', emoji: '👦', text: data.familyInsights.child },
                { name: 'Grandparent', emoji: '👴', text: data.familyInsights.grandparent }
              ].map((insight, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm flex items-start gap-6 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-bg-primary flex items-center justify-center text-3xl group-hover:bg-accent transition-colors">
                    {insight.emoji}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl">{insight.name}</h4>
                    <p className="text-lg text-text-secondary font-light leading-relaxed">{insight.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 flex justify-end">
              <button onClick={() => onNavigate('dashboard')} className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
