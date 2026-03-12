import React from 'react';
import { motion } from 'motion/react';
import { Headphones, Home, History, BarChart3, Users, User, TrendingUp, TrendingDown, Minus, AlertCircle, Download } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface FamilyAnalyticsProps {
  onNavigate: (screen: Screen) => void;
}

export const FamilyAnalytics: React.FC<FamilyAnalyticsProps> = ({ onNavigate }) => {
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
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest">
            <BarChart3 size={18} />
            <span>Family Analytics</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold">Monthly Health Overview</h1>
          <p className="text-xl text-text-secondary">Consistency builds health. Here is how your family is doing.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Overall Balance & Trends */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
              <h3 className="text-2xl font-serif font-bold">Overall Nutrition Balance</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-bg-primary" />
                  <motion.circle 
                    cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12" 
                    strokeDasharray={553}
                    initial={{ strokeDashoffset: 553 }}
                    animate={{ strokeDashoffset: 553 * (1 - 0.78) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-accent" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold tracking-tighter">78%</span>
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Balance</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm space-y-8">
              <h3 className="text-2xl font-serif font-bold">Monthly Trend</h3>
              <div className="flex items-end justify-between h-48 gap-3">
                {[40, 65, 55, 85, 70, 90, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-bg-primary rounded-full relative group hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-white px-2 py-1 rounded-md">{h}%</div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Protein', 'Fiber', 'Calorie Balance'].map((label, i) => (
                  <button key={i} className={cn(
                    "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                    i === 0 ? "bg-accent text-white border-accent" : "bg-white text-text-secondary border-black/5 hover:bg-black/5"
                  )}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Member Summary & Risks */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-serif font-bold">Family Member Summary</h3>
                <button onClick={() => onNavigate('edit-member')} className="text-sm font-bold text-accent uppercase tracking-widest hover:text-accent/80 transition-colors">+ Add Member</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Ben', emoji: '👨', score: 72, protein: '45g', veg: '2 cups', grade: 'B+' },
                  { name: 'Leo', emoji: '👦', score: 90, protein: '30g', veg: '4 cups', grade: 'A+' }
                ].map((member, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-sm space-y-8 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-bg-primary flex items-center justify-center text-3xl group-hover:bg-accent transition-colors">
                        {member.emoji}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-1">{member.name}</h4>
                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Stability Score: {member.score}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/5">
                      <div className="text-center">
                        <p className="text-[8px] text-text-secondary uppercase font-bold tracking-widest mb-1">Protein</p>
                        <p className="text-sm font-bold">{member.protein}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-text-secondary uppercase font-bold tracking-widest mb-1">Veg Intake</p>
                        <p className="text-sm font-bold">{member.veg}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-text-secondary uppercase font-bold tracking-widest mb-1">Energy</p>
                        <p className="text-sm font-bold text-accent">{member.grade}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 flex items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <AlertCircle size={32} />
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xl text-red-600">Risk Indicator</h4>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    Frequent carb spikes detected on weekends. Consider adding more fiber to Sunday meals to maintain stable energy levels for the whole family.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="flex-1 bg-accent text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20">
                  View Detailed Breakdown
                </button>
                <button className="flex-1 bg-white border border-black/10 text-text-secondary px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black/5 transition-colors shadow-sm">
                  <Download size={24} /> Download Report (PDF)
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
