import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Keyboard, Mic, Send, Headphones, Home, History, BarChart3, Users, User, Utensils } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface PlanMealProps {
  onNavigate: (screen: Screen) => void;
}

export const PlanMeal: React.FC<PlanMealProps> = ({ onNavigate }) => {
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-16 space-y-12">
        <div className="space-y-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent shadow-sm">
              <Utensils size={40} />
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold">Plan a Meal</h1>
              <p className="text-xl text-text-secondary">Pick a suggestion or ask in your own words</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            'Dinner tonight',
            "This week's plan",
            "Kid’s tiffin ideas"
          ].map((chip) => (
            <button key={chip} className="px-8 py-4 bg-white border border-black/5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm">
              {chip}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'text', title: 'Text', icon: <Keyboard size={32} />, color: 'bg-bg-primary text-text-secondary' },
            { id: 'voice', title: 'Voice', icon: <Mic size={32} />, color: 'bg-bg-primary text-text-secondary' },
            { id: 'telegram', title: 'Telegram', icon: <Send size={32} />, color: 'bg-bg-primary text-text-secondary' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-10 rounded-[3rem] border border-black/5 flex flex-col items-center gap-6 group hover:shadow-xl transition-all shadow-sm"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors", item.color)}>
                {item.icon}
              </div>
              <h3 className="font-bold text-2xl font-serif">{item.title}</h3>
            </motion.button>
          ))}
        </div>

        <div className="p-10 rounded-[3rem] bg-accent/5 border border-accent/10 text-center">
          <p className="text-xl text-text-secondary font-serif italic max-w-2xl mx-auto">
            "Priya will consider your family’s health profile and recent meals to suggest the perfect recipe."
          </p>
        </div>
      </main>
    </div>
  );
};
