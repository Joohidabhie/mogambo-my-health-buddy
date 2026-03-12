import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Headphones, Mic } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PriyaChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriyaChat: React.FC<PriyaChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am Priya, your family’s nutrition buddy. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: "You are Priya, a warm, wise, and gentle nutrition assistant for an Indian family. You speak in a helpful, encouraging tone. You understand Indian food (dal, sabzi, roti, etc.) and provide practical, non-judgmental advice. Avoid strict calorie counting. Focus on balance and family wellness.",
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm sorry, I couldn't process that. Could you try again?" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a little trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[600px] md:rounded-[40px] md:shadow-2xl md:border md:border-black/5 overflow-hidden"
        >
          {/* Header */}
          <header className="bg-accent p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Headphones size={20} />
              </div>
              <div>
                <h2 className="font-bold">Priya</h2>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">Always here to help</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-tr-none' 
                    : 'bg-white border border-black/5 text-text-primary rounded-tl-none shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <footer className="p-6 bg-white border-t border-black/5">
            <div className="flex items-center gap-2 bg-bg-secondary rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="p-2 text-text-secondary hover:text-accent transition-colors">
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-accent text-white rounded-full disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
