import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, Keyboard, Mic, Send, Headphones, Home, History, BarChart3, Users, User } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface LogMealSelectionProps {
  onNavigate: (screen: Screen, method?: string) => void;
  onOpenChat: () => void;
}

export const LogMealSelection: React.FC<LogMealSelectionProps> = ({ onNavigate, onOpenChat }) => {
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
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold">Log a Meal</h1>
          <p className="text-xl text-text-secondary">Choose your preferred way to record your family's nutrition.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {[
            { id: 'photo', title: 'Photo', desc: 'Snap or upload a picture of your dish', icon: <Camera size={40} />, color: 'bg-accent/10 text-accent' },
            { id: 'voice', title: 'Voice', desc: 'Describe your meal using voice commands', icon: <Mic size={40} />, color: 'bg-accent/10 text-accent', featured: true },
            { id: 'chat', title: 'Chat', desc: 'Send a message to our chat bot', icon: <Send size={40} />, color: 'bg-highlight/10 text-highlight' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ y: -8, scale: item.featured ? 1.22 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (item.id === 'chat') {
                  onNavigate('chat-page');
                } else {
                  onNavigate('log-meal-input', item.id);
                }
              }}
              className={cn(
                "bg-white p-12 rounded-[3rem] border border-black/5 shadow-sm flex flex-col items-center text-center gap-8 group hover:shadow-xl transition-all",
                item.featured ? "md:scale-[1.2] border-accent/20 shadow-md z-10" : ""
              )}
            >
              <div className={cn("w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all group-hover:scale-110", item.color)}>
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-3xl">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 px-6 py-2 rounded-full bg-black/5 text-xs font-bold uppercase tracking-widest group-hover:bg-accent group-hover:text-white transition-colors">
                Select Method
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};
