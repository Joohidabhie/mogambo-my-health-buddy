import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, Send, Mic, Headphones, Home, History, BarChart3, Users, User } from 'lucide-react';
import { Screen } from '../types';
import { analyzeMeal } from '../services/geminiService';

interface LogMealInputProps {
  method: 'photo' | 'text' | 'voice';
  onNavigate: (screen: Screen) => void;
  onAnalysisComplete: (analysis: any) => void;
}

export const LogMealInput: React.FC<LogMealInputProps> = ({ method, onNavigate, onAnalysisComplete }) => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to use voice logging.");
    }
  };

  const stopRecording = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64AudioMessage = reader.result as string;
            setAudioData(base64AudioMessage);
            resolve(base64AudioMessage);
          };
        };
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    if (method === 'voice') {
      startRecording();
    }
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [method]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      let result;
      if (method === 'voice') {
        const audio = await stopRecording();
        if (audio) {
          result = await analyzeMeal("", audio, undefined);
        } else {
          throw new Error("No audio recorded");
        }
      } else if (method === 'photo' && image) {
        result = await analyzeMeal("", undefined, image);
      } else {
        result = await analyzeMeal(input || "A healthy Indian meal");
      }
      onAnalysisComplete(result);
      onNavigate('meal-analysis');
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-16 space-y-12">
        <div className="space-y-4">
          <button 
            onClick={() => onNavigate('log-meal-selection')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold">
            {method === 'photo' ? 'Snap a Photo' : method === 'text' ? 'Describe Meal' : 'Voice Log'}
          </h1>
          <p className="text-xl text-text-secondary">Provide details about the meal to get nutritional insights.</p>
        </div>

        <div className="flex-1 flex flex-col gap-12">
          {method === 'photo' && (
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="w-full max-w-2xl aspect-square bg-white rounded-[3rem] border-2 border-dashed border-black/10 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:border-accent/50 transition-colors shadow-sm">
                {image ? (
                  <img src={image} alt="Meal" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-bg-primary flex items-center justify-center mx-auto group-hover:bg-accent transition-colors">
                      <Camera size={48} className="text-text-secondary group-hover:text-white" />
                    </div>
                    <p className="text-lg text-text-secondary font-serif font-bold">Tap to capture or upload</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {image && (
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full max-w-2xl py-6 rounded-3xl bg-accent text-white font-bold text-xl uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-2xl shadow-accent/20 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Meal'}
                </button>
              )}
            </div>
          )}

          {method === 'text' && (
            <div className="flex flex-col gap-12">
              <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm min-h-[400px]">
                <textarea 
                  placeholder="What did the family eat today? e.g. 2 Rotis, Dal Tadka and a small bowl of Bhindi Sabzi."
                  className="w-full h-full bg-transparent border-none focus:ring-0 text-2xl lg:text-3xl font-serif font-bold resize-none placeholder:text-black/10"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={!input || isAnalyzing}
                className="w-full py-6 rounded-3xl bg-accent text-white font-bold text-xl uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-2xl shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Meal'}
                <Send size={24} />
              </button>
            </div>
          )}

          {method === 'voice' && (
            <div className="flex flex-col items-center justify-center gap-16 py-12">
              <div className="text-center space-y-6">
                <h2 className="text-5xl lg:text-7xl font-serif font-bold">
                  {isAnalyzing ? 'Analyzing...' : isRecording ? 'Listening...' : 'Ready'}
                </h2>
                <p className="text-xl text-text-secondary">
                  {isAnalyzing ? 'Processing your meal...' : 'Tell me what you ate'}
                </p>
              </div>
              
              <motion.button 
                animate={isRecording ? { scale: [1, 1.1, 1], boxShadow: ['0 0 0px rgba(242, 125, 38, 0)', '0 0 40px rgba(242, 125, 38, 0.4)', '0 0 0px rgba(242, 125, 38, 0)'] } : {}}
                transition={isRecording ? { repeat: Infinity, duration: 2 } : {}}
                className={`w-48 h-48 rounded-full flex items-center justify-center text-white shadow-2xl ${isRecording ? 'bg-accent shadow-accent/40' : 'bg-black/20 shadow-black/10'}`}
              >
                <Mic size={64} />
              </motion.button>

              <button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="px-12 py-4 rounded-full bg-white border border-black/10 text-accent font-bold uppercase tracking-widest hover:bg-black/5 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Stop & Analyze'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
