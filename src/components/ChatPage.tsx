import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Send, Home, History, BarChart3, Users } from 'lucide-react';
import { Screen } from '../types';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPageProps {
  onNavigate: (screen: Screen) => void;
  onAnalysisComplete: (analysis: any) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate, onAnalysisComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am Priya, your family’s nutrition buddy. Tell me what you ate today, and I\'ll help you log it and analyze its nutritional value.' }
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
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      
      const logMealFunctionDeclaration: FunctionDeclaration = {
        name: "logMeal",
        parameters: {
          type: Type.OBJECT,
          description: "Logs the meal and provides nutritional analysis once enough information is gathered from the user.",
          properties: {
            dishName: { type: Type.STRING },
            nutritionalScore: { type: Type.NUMBER },
            proteinStatus: { type: Type.STRING },
            fiberStatus: { type: Type.STRING },
            carbQuality: { type: Type.STRING },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            familyInsights: {
              type: Type.OBJECT,
              properties: {
                mom: { type: Type.STRING },
                dad: { type: Type.STRING },
                child: { type: Type.STRING },
                grandparent: { type: Type.STRING }
              }
            }
          },
          required: ["dishName", "nutritionalScore", "proteinStatus", "fiberStatus", "carbQuality", "suggestions", "familyInsights"]
        }
      };

      const history = newMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = ai.chats.create({
        model,
        history,
        config: {
          systemInstruction: "You are Priya, a warm, wise, and gentle nutrition assistant for an Indian family. You speak in a helpful, encouraging tone. You understand Indian food (dal, sabzi, roti, etc.) and provide practical, non-judgmental advice. Avoid strict calorie counting. Focus on balance and family wellness. The user is trying to log a meal. Ask clarifying questions if needed. Once you have enough information about the meal, call the logMeal function to provide the nutritional analysis and log the meal.",
          tools: [{ functionDeclarations: [logMealFunctionDeclaration] }],
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      
      const functionCalls = response.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === 'logMeal') {
          const analysis = call.args;
          onAnalysisComplete(analysis);
          onNavigate('meal-analysis');
          return;
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm sorry, I couldn't process that. Could you try again?" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a little trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

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
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm text-text-secondary hover:bg-black/5"
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-[calc(100vh-80px)]">
        <div className="mb-6">
          <button 
            onClick={() => onNavigate('log-meal-selection')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
        </div>

        <div className="flex-1 bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-accent/10 p-6 flex items-center gap-4 border-b border-black/5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
              👩‍⚕️
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-accent">Chat with Priya</h2>
              <p className="text-sm text-text-secondary">Log your meal by chatting</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-primary/30">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-5 rounded-2xl text-base leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-tr-none' 
                    : 'bg-white border border-black/5 text-text-primary rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-black/5 p-5 rounded-2xl rounded-tl-none shadow-sm flex gap-2">
                  <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-black/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe what you ate..."
                className="flex-1 bg-bg-primary border-none rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
