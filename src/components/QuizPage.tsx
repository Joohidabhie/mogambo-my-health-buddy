import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuizPageProps {
  onBack: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(2);
  
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/15 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Users className="text-accent" size={16} />
          </div>
          <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Services', 'Nutrition', 'Reviews', 'Contacts', 'Quiz'].map((item) => (
            <a key={item} href="#" className={cn(
              "text-sm font-medium transition-colors",
              item === 'Quiz' ? "text-accent border-b-2 border-accent" : "text-text-secondary hover:text-accent"
            )}>
              {item}
            </a>
          ))}
        </nav>

        <div className="w-20" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl space-y-20">
          <div className="flex justify-between items-center text-text-secondary/60 font-medium">
            <button onClick={onBack} className="hover:text-accent transition-colors">Back</button>
            <h1 className="text-5xl lg:text-7xl font-serif text-text-primary">How you feel today?</h1>
            <button className="hover:text-accent transition-colors">Next</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Low energy", desc: "Need a boost" },
              { title: "Racing thoughts", desc: "Need to focus" },
              { title: "Pain in body", desc: "Need relief" }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card p-12 text-center space-y-4 cursor-pointer hover:bg-white transition-colors border-white/40"
              >
                <h3 className="text-3xl font-serif">{card.title}</h3>
                <p className="text-sm text-text-secondary">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-8 text-sm font-bold text-text-secondary/40">
            {['01', '02', '03', '04', '05'].map((num, i) => (
              <span key={num} className={cn(
                "cursor-pointer transition-colors",
                i + 1 === step ? "text-text-primary border-b-2 border-text-primary" : "hover:text-text-secondary"
              )}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </main>

      <footer className="px-8 py-12 flex justify-between items-end">
        <div className="max-w-xs space-y-2 text-[10px] text-text-secondary leading-relaxed uppercase tracking-widest opacity-60">
          <p>The quiz is only a suggestion created by our experts. Please consume responsibly! For use by adults only.</p>
        </div>
        
        <div className="glass-card p-2 flex items-center gap-4 pr-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold">Health Mix C-23</h4>
            <p className="text-xs text-text-secondary">Energy Boost</p>
            <p className="font-bold text-accent">11.99 ₹</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary ml-4">
            <ChevronRight size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
};
