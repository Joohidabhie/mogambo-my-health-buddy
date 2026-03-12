import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, Bell, Plus, Home, History, BarChart3, Users, User, Headphones, ArrowRight, ShoppingCart } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
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
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm",
                    item.label === 'Home' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-black/5"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-bg-secondary rounded-full relative hover:bg-black/5 transition-colors">
              <Bell size={20} className="text-text-secondary" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-highlight rounded-full border-2 border-white" />
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className="flex items-center gap-3 pl-4 border-l border-black/10"
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
        {/* Welcome & Insight */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Box no 2: Welcome & Insight */}
          <div className="glass-card p-12 lg:p-16 space-y-12 relative">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-5xl font-serif leading-tight">Good Afternoon, Ananya</h1>
              <p className="text-lg text-text-secondary">Here's how your family's nutrition is looking today.</p>
            </div>

            {/* box no 3: Log a Meal */}
            <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 flex items-center gap-10 text-left hover:shadow-xl transition-all group w-full cursor-pointer" onClick={() => onNavigate('log-meal-selection')}>
              <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Camera size={48} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-3xl">Log a Meal</h3>
                <p className="text-lg text-text-secondary">Tell us what you ate</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent/10 p-6 rounded-2xl border border-accent/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg">
                <BarChart3 size={24} />
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Today's Family Insight</p>
                <p className="text-lg font-medium text-text-primary leading-tight">"Adding a fruit to lunch today would improve fiber intake."</p>
              </div>
            </motion.div>

            {/* Plan a Meal */}
            <div className="glass-card p-8 relative">
              <button 
                onClick={() => onNavigate('plan-meal')}
                className="bg-white p-8 rounded-2xl border border-black/5 flex items-center gap-8 text-left hover:shadow-md transition-all group w-full"
              >
                <div className="w-16 h-16 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Plan a Meal</h3>
                  <p className="text-sm text-text-secondary">What should I cook?</p>
                </div>
              </button>
            </div>

            {/* Grocery List */}
            <div className="glass-card p-8 relative">
              <button 
                onClick={() => onNavigate('grocery-list')}
                className="bg-white p-8 rounded-2xl border border-black/5 flex items-center gap-8 text-left hover:shadow-md transition-all group w-full"
              >
                <div className="w-16 h-16 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight group-hover:scale-110 transition-transform">
                  <ShoppingCart size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Grocery List</h3>
                  <p className="text-sm text-text-secondary">Manage your shopping</p>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Recent Meals & More */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif">Recent Meals</h2>
              <button onClick={() => onNavigate('history')} className="text-sm font-bold text-accent uppercase tracking-widest hover:underline">See All</button>
            </div>

            <div className="grid gap-4">
              {[
                { dish: 'Dal Tadka + 2 Rotis', time: 'Today, 1:15 PM', emoji: '🍛' },
                { dish: 'Poha + Chai', time: 'Today, 8:30 AM', emoji: '☕' },
                { dish: 'Mixed Vegetable Sabzi', time: 'Yesterday, 8:45 PM', emoji: '🥗' }
              ].map((meal, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 flex items-center gap-6 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-4xl">{meal.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{meal.dish}</h4>
                    <p className="text-sm text-text-secondary">{meal.time}</p>
                  </div>
                  <ChevronLeft size={20} className="text-text-secondary rotate-180 opacity-30" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif">Family Wellness</h2>
            <div className="glass-card p-8 bg-gradient-to-br from-white/60 to-accent/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Weekly Score</p>
                  <p className="text-4xl font-serif font-bold text-accent">84%</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent flex items-center justify-center font-bold text-accent">
                  +5%
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Your family's protein intake is up by 12% this week. Great job on incorporating more lentils and paneer!
              </p>
              <button onClick={() => onNavigate('family-analytics')} className="mt-6 text-sm font-bold text-accent uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View Detailed Analytics <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
