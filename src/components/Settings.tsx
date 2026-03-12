import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Headphones, Home, History, BarChart3, Users, User, Settings as SettingsIcon, Bell, Shield, LogOut, Globe, Phone, Send, Activity } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="text-accent" size={20} />
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
                    item.label === 'Settings' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-black/5"
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
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold">Settings</h1>
          <p className="text-text-secondary">Manage your account, family profiles, and preferences.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm flex items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-5xl shadow-inner">
            👩‍🍳
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="font-bold text-3xl">Ananya Sharma</h2>
            <p className="text-lg text-text-secondary">Family Account Admin</p>
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mt-2">
              <Globe size={14} />
              <span>New Delhi, India</span>
            </div>
          </div>
          <button className="px-6 py-3 rounded-full border border-black/10 font-bold text-sm hover:bg-black/5 transition-all">
            Edit Profile
          </button>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              label: 'Account & Family',
              options: [
                { icon: <Users size={20} />, title: 'Edit Family Profiles', desc: 'Manage and update household members.' },
                { icon: <User size={20} />, title: 'Personal Information', desc: 'Edit name, contact details, and account settings.' }
              ]
            },
            {
              label: 'Preferences',
              options: [
                { icon: <Globe size={20} />, title: 'Food Preferences', desc: 'Allergies, diets, cuisines.' },
                { icon: <Bell size={20} />, title: 'Notifications', desc: 'Enable / disable reminders for meals and insights.', toggle: true }
              ]
            },
            {
              label: 'Connected Channels',
              options: [
                { icon: <Headphones size={20} />, title: 'Voice Assistant', desc: 'Talk to Priya' },
                { icon: <Phone size={20} />, title: 'Phone Calls', desc: 'Call Me Now & Scheduled' },
                { icon: <Send size={20} />, title: 'Telegram', desc: 'Connected: @PriyaHealthBot' },
                { icon: <Activity size={20} />, title: 'CGM Monitor', desc: 'Freestyle Libre 3' }
              ]
            },
            {
              label: 'Support & Legal',
              options: [
                { icon: <Shield size={20} />, title: 'Help & FAQs' },
                { icon: <Shield size={20} />, title: 'Privacy Policy' },
                { icon: <Shield size={20} />, title: 'Terms of Service' }
              ]
            }
          ].map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] px-4">{section.label}</h3>
              <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm">
                {section.options.map((opt, j) => (
                  <button 
                    key={j} 
                    className="w-full p-6 flex items-center gap-6 border-b border-black/5 last:border-0 text-left hover:bg-black/[0.02] transition-colors group"
                    onClick={() => {
                      if (opt.toggle) {
                        setNotificationsEnabled(!notificationsEnabled);
                      }
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-bg-primary flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{opt.title}</h4>
                      {opt.desc && <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>}
                    </div>
                    {opt.toggle ? (
                      <div 
                        className={cn(
                          "w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out",
                          notificationsEnabled ? "bg-accent" : "bg-gray-300"
                        )}
                      >
                        <div 
                          className={cn(
                            "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out",
                            notificationsEnabled ? "translate-x-6" : "translate-x-0"
                          )} 
                        />
                      </div>
                    ) : (
                      <ChevronRight size={20} className="text-text-secondary group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex justify-center">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-red-500 font-bold text-lg hover:bg-red-50 px-8 py-4 rounded-full transition-all"
          >
            <LogOut size={24} /> Log Out from Account
          </button>
        </div>
      </main>
    </div>
  );
};
