import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate and authenticate here
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col bg-ombre-soft relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <header className="p-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Users className="text-accent" size={16} />
          </div>
          <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
        </div>
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-10 space-y-8 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
            <p className="text-text-secondary">Please enter your details to log in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-text-secondary ml-1">Email or Phone Number</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="glass-input !pl-14 w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-text-secondary ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input !pl-14 w-full"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-black/10 text-accent focus:ring-accent" />
                <span className="text-text-secondary group-hover:text-text-primary transition-colors">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={onForgotPassword}
                className="text-accent font-bold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button 
              type="submit"
              className="pill-button-primary w-full py-4 text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Log in
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-text-secondary">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={onBack}
                className="text-accent font-bold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="p-8 text-center text-sm text-text-secondary">
        © 2024 MY health buddy. All rights reserved.
      </footer>
    </div>
  );
};
