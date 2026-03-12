import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight,
  Play,
  Activity,
  Users,
  BrainCircuit,
  Camera,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  onQuiz: () => void;
  onAIStudio: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, onQuiz, onAIStudio }) => {
  return (
    <div className="flex flex-col w-full relative bg-bg-primary text-text-primary overflow-x-hidden font-sans">
      {/* Header */}
      <header className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Users size={16} className="text-accent" />
          </div>
          <span className="text-lg font-serif font-bold text-accent">My Health Buddy</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={onLogin} className="text-sm font-medium hover:text-accent transition-colors">Log in</button>
          <button onClick={onStart} className="bg-accent text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-accent-light transition-colors">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-12">
          <h1 className="text-6xl lg:text-[5.5rem] font-serif leading-[0.9] tracking-tight">
            YOUR<br />
            FAMILY'S<br />
            <span className="text-accent">HEALTH</span><br />
            UNDERSTOOD<br />
            <span className="ml-24">GENTLY</span>
          </h1>
          
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-text-secondary">
            <span>SIMPLE. THOUGHTFUL. PERSONAL.</span>
            <div className="h-[1px] flex-1 bg-black/10" />
            <span className="text-accent">AI POWERED</span>
          </div>

          <div className="space-y-4 max-w-md">
            {[
              { icon: <Camera size={18} className="text-accent" />, text: 'Meal Analysis', subtext: '10+ types' },
              { icon: <Users size={18} className="text-accent" />, text: 'Family Wellness', subtext: '20+ plans' },
              { icon: <Zap size={18} className="text-accent" />, text: 'Nutrition AI', subtext: '8 modules' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-4 rounded-full bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-bold text-base">{item.text}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary text-xs">
                  <span>{item.subtext}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-bold tracking-widest uppercase text-text-secondary">
            DESIGNED FOR INDIAN HOMES
          </p>
        </div>

        <div className="relative h-[700px] rounded-[3rem] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
            alt="Healthy Bowl" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Users size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-black">Join 10k+ Families</span>
          </div>
          <div className="absolute bottom-8 right-8 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-black">Expert Verified</span>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative h-[800px] flex items-center justify-center">
          {/* Center Text */}
          <div className="text-center z-10 bg-bg-primary p-8 rounded-full">
            <h2 className="text-6xl font-serif leading-none">
              WHY<br />
              <span className="text-accent">US?</span>
            </h2>
          </div>

          {/* Decorative Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full border border-accent/20" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-accent/20" />
            <div className="absolute w-[800px] h-[800px] rounded-full border border-accent/10" />
          </div>

          {/* Cards */}
          <div className="absolute top-20 left-10 bg-white p-10 rounded-[2rem] shadow-sm w-[320px]">
            <span className="text-accent font-serif text-2xl mb-4 block font-bold">01</span>
            <h3 className="font-serif font-bold text-2xl mb-3">Qualified Staff</h3>
            <p className="text-sm text-text-secondary leading-relaxed">10+ years average experience of our nutritionists.</p>
          </div>

          <div className="absolute top-20 right-10 bg-white p-10 rounded-[2rem] shadow-sm w-[320px]">
            <span className="text-accent font-serif text-2xl mb-4 block font-bold">03</span>
            <h3 className="font-serif font-bold text-2xl mb-3">Smart Tech</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Advanced AI for instant meal analysis.</p>
          </div>

          <div className="absolute bottom-20 left-10 bg-white p-10 rounded-[2rem] shadow-sm w-[320px]">
            <span className="text-accent font-serif text-2xl mb-4 block font-bold">02</span>
            <h3 className="font-serif font-bold text-2xl mb-3">Quality Service</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Personalized approach to every family member.</p>
          </div>

          <div className="absolute bottom-20 right-10 bg-white p-10 rounded-[2rem] shadow-sm w-[320px]">
            <span className="text-accent font-serif text-2xl mb-4 block font-bold">04</span>
            <h3 className="font-serif font-bold text-2xl mb-3">Actual Knowledge</h3>
            <p className="text-sm text-text-secondary leading-relaxed">We stay updated with latest health research.</p>
          </div>
        </div>
      </section>

      {/* Explore Plans Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-text-secondary mb-4">EXPLORE WELLNESS</p>
            <h2 className="text-5xl font-serif">Nutrition <span className="text-text-secondary">/ Family Plans</span></h2>
          </div>
          <div className="flex gap-3">
            {['All', 'Recipes', 'Tips', 'Plans'].map((tab, i) => (
              <button 
                key={tab}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-colors",
                  i === 0 ? "bg-accent text-white" : "bg-white text-text-secondary hover:bg-black/5"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-6 h-[900px]">
          {/* Consultations */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-1 row-span-2">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" alt="Consultations" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">Consultations</span>
          </div>

          {/* Healthy Recipes */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-1 row-span-2">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" alt="Healthy Recipes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">Healthy Recipes</span>
          </div>

          {/* Meal Planning */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-2 row-span-1">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" alt="Meal Planning" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">Meal Planning</span>
          </div>

          {/* Nutrition Tips */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-2 row-span-1">
            <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800" alt="Nutrition Tips" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">Nutrition Tips</span>
          </div>

          {/* Family Health */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-1 row-span-1">
            <img src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=800" alt="Family Health" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">Family Health</span>
          </div>

          {/* AI Assistant */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-1 row-span-1">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800" alt="AI Assistant" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <span className="absolute bottom-8 left-8 text-white font-serif font-bold text-xl">AI Assistant</span>
          </div>

          {/* JOIN US */}
          <div className="relative rounded-[2rem] overflow-hidden group col-span-2 row-span-1 bg-gradient-to-br from-[#FFB888] to-[#F2D5C4] flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" alt="Background pattern" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="relative z-10 text-black font-serif font-bold text-2xl tracking-widest">JOIN US</span>
          </div>
        </div>
      </section>

      {/* Meet Priya Section */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <p className="text-xs font-bold tracking-widest uppercase text-text-secondary">MEET AI ASSISTANT</p>
          <h2 className="text-6xl font-serif leading-none">
            MEET<br />
            PRIYA
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-md">
            Meet Priya, your family's dedicated AI health buddy. She analyzes meals, tracks nutrition, and offers personalized guidance for your whole family.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {['VOICE CHAT IN YOUR LANGUAGE', 'PHONE CALL LIKE A REAL DOC', 'PERSONALIZED DIET PLANS'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-accent/30 text-accent text-xs font-bold tracking-wider bg-accent/5">
                {tag}
              </span>
            ))}
          </div>

          <button onClick={onQuiz} className="flex items-center gap-4 font-bold text-sm tracking-widest uppercase group mt-8">
            LEARN MORE
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white group-hover:bg-accent-light transition-colors">
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="w-[600px] h-[600px] rounded-full overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
              alt="Healthy Bowl" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-accent hover:scale-110 transition-transform shadow-xl">
                <Play size={32} className="ml-2" />
              </button>
            </div>
          </div>
          {/* Decorative outline */}
          <div className="absolute inset-0 border border-black/10 rounded-full scale-105 pointer-events-none" />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-lg font-serif font-bold text-accent">My Health Buddy</span>
            </div>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              Empowering families to understand their health, one meal at a time. Simple, insightful, and culturally aware nutrition guidance.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">COMPANY</h4>
            <ul className="space-y-3 text-sm font-medium text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Nutrition</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contacts</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">SOCIALS</h4>
            <ul className="space-y-3 text-sm font-medium text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
          <p>© 2024 MY HEALTH BUDDY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-accent transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
