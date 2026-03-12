import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Users, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
          <span className="font-medium">Back to Login</span>
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
          {!isSubmitted ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif font-bold">Reset Password</h1>
                <p className="text-text-secondary">Enter your email and we'll send you a link to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
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

                <button 
                  type="submit"
                  className="pill-button-primary w-full py-4 text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold">Check your email</h2>
                <p className="text-text-secondary">
                  We've sent a password reset link to <span className="font-bold text-text-primary">{email}</span>
                </p>
              </div>
              <button 
                onClick={onBack}
                className="pill-button-secondary w-full py-4 text-lg"
              >
                Return to Login
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="p-8 text-center text-sm text-text-secondary">
        © 2024 MY health buddy. All rights reserved.
      </footer>
    </div>
  );
};
