import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Headphones, Home, History as HistoryIcon, BarChart3, Users, User } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface HistoryProps {
  onNavigate: (screen: Screen) => void;
}

export const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <HistoryIcon className="text-accent" size={20} />
              </div>
              <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: 'Home', icon: <Home size={18} />, screen: 'dashboard' as Screen },
                { label: 'History', icon: <HistoryIcon size={18} />, screen: 'history' as Screen },
                { label: 'Insights', icon: <BarChart3 size={18} />, screen: 'insights' as Screen },
                { label: 'Family', icon: <Users size={18} />, screen: 'family-setup' as Screen },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onNavigate(item.screen)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm",
                    item.label === 'History' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-black/5"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold">Monthly Nutrition Log</h1>
            <p className="text-text-secondary">Review your family's nutritional journey over time.</p>
          </div>
          <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-full border border-black/5 shadow-sm">
            <button className="p-2 text-text-secondary hover:text-accent transition-colors"><ChevronLeft size={20} /></button>
            <span className="font-bold text-lg">October 2023</span>
            <button className="p-2 text-text-secondary hover:text-accent transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'TOTAL MEALS', value: '92', trend: '+12% vs last month' },
            { label: 'AVERAGE SCORE', value: '8.2', trend: 'Stable' },
            { label: 'BEST DAY', value: 'Oct 26', trend: '9.4/10' },
            { label: 'NEEDS ATTENTION', value: 'Fiber', trend: '3 days below target' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">{stat.label}</p>
              <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-black/5">
          <div className="flex items-center gap-4">
            <select className="bg-white px-6 py-3 rounded-full border border-black/5 text-sm font-bold appearance-none cursor-pointer hover:border-accent transition-colors">
              <option>All Meals</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
            
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-black/5">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Family Breakdown</span>
              <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-xs font-bold uppercase tracking-widest">Showing 1-12 of 92 entries</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { date: 'Oct 4', member: 'Sarah', type: 'Dinner', dish: 'Grilled Chicken Salad', score: 9.0, protein: 'OK', fiber: 'OK', img: 'https://picsum.photos/seed/salad/400/300' },
            { date: 'Oct 4', member: 'David', type: 'Dinner', dish: 'Dal Tadka + 2 Rotis', score: 7.5, protein: 'OK', fiber: 'LOW', img: 'https://picsum.photos/seed/dal/400/300' },
            { date: 'Oct 3', member: 'Leo', type: 'Lunch', dish: 'Paneer Paratha', score: 8.2, protein: 'OK', fiber: 'OK', img: 'https://picsum.photos/seed/paratha/400/300' },
            { date: 'Oct 3', member: 'Sarah', type: 'Breakfast', dish: 'Oats with Berries', score: 9.2, protein: 'OK', fiber: 'OK', img: 'https://picsum.photos/seed/oats/400/300' },
            { date: 'Oct 2', member: 'David', type: 'Lunch', dish: 'Chicken Biryani', score: 6.8, protein: 'HIGH', fiber: 'LOW', img: 'https://picsum.photos/seed/biryani/400/300' },
            { date: 'Oct 2', member: 'Leo', type: 'Snack', dish: 'Apple & Peanut Butter', score: 8.8, protein: 'OK', fiber: 'OK', img: 'https://picsum.photos/seed/apple/400/300' }
          ].map((row, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="h-48 relative overflow-hidden">
                <img src={row.img} alt={row.dish} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-md rounded-full text-text-secondary hover:text-accent transition-colors shadow-sm"><Eye size={16} /></button>
                  <button className="p-2 bg-white/90 backdrop-blur-md rounded-full text-text-secondary hover:text-accent transition-colors shadow-sm"><Pencil size={16} /></button>
                  <button className="p-2 bg-white/90 backdrop-blur-md rounded-full text-text-secondary hover:text-red-500 transition-colors shadow-sm"><Trash2 size={16} /></button>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent shadow-sm">
                  {row.date}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-1">{row.type}</p>
                    <h4 className="font-bold text-xl">{row.dish}</h4>
                  </div>
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm",
                    row.score >= 8 ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {row.score.toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">
                    {row.member === 'Sarah' ? '👩‍🍳' : row.member === 'David' ? '👨‍💼' : '👦'}
                  </div>
                  <span className="font-bold text-sm">{row.member}</span>
                </div>
                
                <div className="flex gap-6 pt-6 border-t border-black/5">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Protein</p>
                    <p className="text-sm font-bold text-green-600">{row.protein}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Fiber</p>
                    <p className={cn("text-sm font-bold", row.fiber === 'OK' ? "text-green-600" : "text-amber-600")}>{row.fiber}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button className="px-12 py-4 rounded-full border border-black/10 font-bold hover:bg-black/5 transition-all">
            Load More Entries
          </button>
        </div>
      </main>
    </div>
  );
};
