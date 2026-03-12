import React from 'react';
import { motion } from 'motion/react';
import { Headphones, Home, History, BarChart3, Users, User, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface InsightsProps {
  onNavigate: (screen: Screen) => void;
}

export const Insights: React.FC<InsightsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <BarChart3 className="text-accent" size={20} />
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
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm",
                    item.label === 'Insights' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-black/5"
                  )}
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold">This Week’s Family Nutrition</h1>
          <p className="text-text-secondary">Deep dive into your family's health patterns and progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Family Health Score */}
          <div className="lg:col-span-1 bg-white p-12 rounded-[3rem] border border-black/5 shadow-sm text-center space-y-8 flex flex-col justify-center">
            <h2 className="text-2xl font-serif">Family Wellness Score</h2>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="90" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-black/5" />
                <motion.circle 
                  cx="96" cy="96" r="90" fill="transparent" stroke="currentColor" strokeWidth="12" 
                  strokeDasharray={565}
                  initial={{ strokeDashoffset: 565 }}
                  animate={{ strokeDashoffset: 565 * (1 - 0.82) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-accent" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold">82</span>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">/ 100</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Protein', trend: 'Moderate', icon: <TrendingUp size={14} />, color: 'text-accent' },
                { label: 'Fiber', trend: 'Improving', icon: <TrendingUp size={14} />, color: 'text-accent' },
                { label: 'Carbs', trend: 'Stable', icon: <Minus size={14} />, color: 'text-text-secondary' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{item.label}</p>
                  <div className={cn("flex items-center justify-center gap-1 text-xs font-bold", item.color)}>
                    {item.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Trend Graph */}
          <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] border border-black/5 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif">Weekly Trend</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs font-bold text-text-secondary uppercase">Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent/20" />
                  <span className="text-xs font-bold text-text-secondary uppercase">Average</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-end h-64 gap-4">
              {[65, 72, 68, 85, 82, 78, 82].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className={cn(
                        "w-full rounded-2xl transition-all group-hover:opacity-80",
                        i === 6 ? "bg-accent shadow-lg shadow-accent/20" : "bg-accent/20"
                      )}
                    />
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-accent">
                      {value}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs font-bold text-text-secondary uppercase tracking-[0.2em] border-t border-black/5 pt-8">
              <span>Avg: 75.5</span>
              <span className="text-accent">Goal: 85.0</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Family Member Insights */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif">Family Member Insights</h2>
            <div className="grid gap-4">
              {[
                { name: 'Sarah', emoji: '👩‍🍳', improved: 'Fiber', attention: 'Carb Quality', score: 88 },
                { name: 'David', emoji: '👨‍💼', improved: 'Protein', attention: 'Veg Variety', score: 76 },
                { name: 'Leo', emoji: '👦', improved: 'Protein', attention: 'Fruit Intake', score: 82 }
              ].map((member, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-black/5 flex items-center gap-6 hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-full bg-bg-primary flex items-center justify-center text-4xl shadow-inner">
                    {member.emoji}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xl">{member.name}</h4>
                      <span className="text-accent font-bold">{member.score}%</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Improved:</span>
                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">{member.improved}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Attention:</span>
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">{member.attention}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Pattern Insights & AI Suggestion */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">Family Pattern Insights</h2>
              <div className="bg-white rounded-[2rem] border border-black/5 overflow-hidden shadow-sm">
                {[
                  "Higher carbs on weekends (Pasta/Pizza nights)",
                  "Vegetable intake strongest on weekdays",
                  "Protein slightly low at dinner for children",
                  "Hydration targets met 5/7 days"
                ].map((insight, i) => (
                  <div key={i} className="p-6 border-b border-black/5 last:border-0 flex items-center gap-4 hover:bg-black/[0.02] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <p className="text-text-primary font-medium">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-highlight/20 to-highlight/5 p-8 rounded-[2rem] border border-highlight/20 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-highlight font-bold text-sm uppercase tracking-[0.2em]">
                <BarChart3 size={20} />
                <span>AI Recommendation for Next Week</span>
              </div>
              <p className="text-xl font-serif leading-relaxed text-text-primary">
                "Try introducing one new seasonal fruit to Leo's breakfast and consider a protein-rich snack for David after his evening commute."
              </p>
              <button className="pill-button-primary w-full mt-4 shadow-lg shadow-accent/20">
                Plan Next Week Better
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
