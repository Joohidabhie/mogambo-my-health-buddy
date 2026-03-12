import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, HelpCircle, Trash2, Plus, Home, History as HistoryIcon, BarChart3, Users, User } from 'lucide-react';
import { FamilyMember, Screen } from '../types';
import { cn } from '../lib/utils';

interface FamilySetupProps {
  members: FamilyMember[];
  onAdd: () => void;
  onEdit: (member: FamilyMember) => void;
  onSave: () => void;
  onNavigate: (screen: Screen) => void;
}

export const FamilySetup: React.FC<FamilySetupProps> = ({ members, onAdd, onEdit, onSave, onNavigate }) => {
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
                { label: 'History', icon: <HistoryIcon size={18} />, screen: 'history' as Screen },
                { label: 'Insights', icon: <BarChart3 size={18} />, screen: 'insights' as Screen },
                { label: 'Family', icon: <Users size={18} />, screen: 'family-setup' as Screen },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onNavigate(item.screen)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm",
                    item.label === 'Family' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-black/5"
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif leading-tight">Who usually eats together at home?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">This helps us personalize guidance for everyone in your household.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <motion.div 
              key={member.id}
              whileHover={{ y: -5 }}
              onClick={() => onEdit(member)}
              className="bg-white p-8 rounded-[2.5rem] border border-black/5 relative shadow-sm group cursor-pointer hover:shadow-md transition-all"
            >
              <button className="absolute top-6 right-6 p-2 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                <Trash2 size={18} />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-bg-primary flex items-center justify-center text-5xl shadow-inner">
                  {member.avatar}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-2xl">{member.name}</h3>
                  <p className="text-accent font-bold text-sm uppercase tracking-widest">{member.relationship}</p>
                </div>
                <div className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-secondary pt-6 border-t border-black/5">
                  <span>{member.role}</span>
                  <span>{member.ageRange} yrs</span>
                </div>
              </div>
            </motion.div>
          ))}

          <button 
            onClick={onAdd}
            className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-center space-y-4 group hover:border-accent hover:bg-white/60 transition-all min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all shadow-sm">
              <Plus size={32} />
            </div>
            <div>
              <p className="font-bold text-xl">Add Member</p>
              <p className="text-sm text-text-secondary">Create a new profile</p>
            </div>
          </button>
        </div>

        <div className="glass-card p-8 flex gap-6 items-center bg-gradient-to-br from-white/60 to-accent/5">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
            <BarChart3 size={32} className="text-accent" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg text-accent">Balanced Nutrition for All</h4>
            <p className="text-text-secondary leading-relaxed">
              We automatically adjust portions and nutrient guidance based on age, activity level, and health context for each member.
            </p>
          </div>
        </div>

        <div className="pt-8 flex justify-center">
          <button 
            onClick={onSave}
            disabled={members.length === 0}
            className="pill-button-primary px-24 py-5 text-xl disabled:opacity-50 shadow-xl"
          >
            Save Household
          </button>
        </div>
      </main>
    </div>
  );
};
