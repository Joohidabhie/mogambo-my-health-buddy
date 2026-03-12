import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface SuccessScreenProps {
  onContinue: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-bg-primary text-center bg-ombre-soft">
      <div className="max-w-2xl w-full flex flex-col items-center justify-center space-y-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring */}
          <div className="w-64 h-64 rounded-full border-2 border-accent/30 flex items-center justify-center">
            {/* Inner Ring */}
            <div className="w-56 h-56 rounded-full border-4 border-accent flex items-center justify-center">
              {/* Gradient Circle */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-white to-black/5 flex items-center justify-center shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Check size={80} className="text-accent" strokeWidth={4} />
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Subtle pulse animation */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-accent/20"
          />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl lg:text-5xl font-serif font-medium tracking-tight"
          >
            You're all set.
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-text-secondary max-w-md mx-auto leading-relaxed"
          >
            Next, we'll set up your household to personalize your experience.
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pt-8"
        >
          <button onClick={onContinue} className="pill-button-primary px-24 py-5 text-xl shadow-2xl hover:scale-105 transition-transform">
            Continue to Household
          </button>
        </motion.div>
      </div>
    </div>
  );
};
