import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  Send, 
  Loader2, 
  Download, 
  RefreshCw,
  AlertCircle,
  Key
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { cn } from '../lib/utils';

interface AIGeneratorProps {
  onBack: () => void;
  initialImage?: string;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onBack, initialImage }) => {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(initialImage || null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio?.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
    } else {
      // Fallback for dev environment
      setHasApiKey(true);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = process.env.API_KEY || '';
      const gemini = new GeminiService(apiKey);

      if (mode === 'image') {
        let imageUrl;
        if (currentImage) {
          imageUrl = await gemini.editImage(currentImage, prompt);
        } else {
          imageUrl = await gemini.generateImage(prompt);
        }
        setResult(imageUrl);
        setCurrentImage(imageUrl);
      } else {
        const videoUrl = await gemini.generateVideo(prompt, currentImage || undefined);
        setResult(videoUrl);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Generation failed. Please try again.");
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-accent flex items-center gap-2">
              <Sparkles size={20} />
              AI Studio
            </h1>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-widest">
              {mode === 'image' ? 'Nano Banana 2' : 'Veo Video Engine'}
            </p>
          </div>
        </div>

        {!hasApiKey && (
          <button 
            onClick={handleSelectKey}
            className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold hover:bg-accent/20 transition-colors"
          >
            <Key size={16} />
            Select API Key
          </button>
        )}
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-8">
        {/* Mode Toggle */}
        <div className="flex p-1 bg-black/5 rounded-2xl w-fit mx-auto">
          <button
            onClick={() => setMode('image')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              mode === 'image' ? "bg-white shadow-sm text-accent" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <ImageIcon size={18} />
            Image Edit
          </button>
          <button
            onClick={() => setMode('video')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              mode === 'video' ? "bg-white shadow-sm text-accent" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Video size={18} />
            Viral Video
          </button>
        </div>

        {/* Display Area */}
        <div className="aspect-video w-full bg-black/5 rounded-[2.5rem] overflow-hidden relative border border-black/5 shadow-inner flex items-center justify-center group">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 text-center p-8"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-accent animate-spin" />
                  <Sparkles className="absolute -top-2 -right-2 text-accent animate-pulse" size={20} />
                </div>
                <div>
                  <p className="font-bold text-lg">Creating your masterpiece...</p>
                  <p className="text-sm text-text-secondary">This usually takes about 30-60 seconds</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full"
              >
                {mode === 'image' ? (
                  <img src={result} alt="Generated" className="w-full h-full object-contain" />
                ) : (
                  <video src={result} controls autoPlay loop className="w-full h-full object-contain" />
                )}
                
                <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={result} 
                    download={`ai-gen-${Date.now()}`}
                    className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-accent hover:bg-white transition-colors"
                  >
                    <Download size={20} />
                  </a>
                  <button 
                    onClick={() => {
                      setResult(null);
                      setPrompt('');
                    }}
                    className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-accent hover:bg-white transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </motion.div>
            ) : currentImage ? (
              <motion.div 
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full relative"
              >
                <img src={currentImage} alt="Reference" className="w-full h-full object-contain opacity-50 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Sparkles className="mx-auto mb-4 text-accent/40" size={48} />
                    <p className="font-bold text-text-secondary">Ready to transform this image</p>
                    <p className="text-sm text-text-secondary/60">Describe what you want to change or add</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 space-y-4"
              >
                <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center mx-auto">
                  {mode === 'image' ? <ImageIcon className="text-accent/40" size={40} /> : <Video className="text-accent/40" size={40} />}
                </div>
                <div>
                  <p className="font-bold text-lg">What should I create?</p>
                  <p className="text-sm text-text-secondary">Describe your vision in the box below</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="absolute top-6 left-6 right-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mode === 'image' ? "e.g., Add a vibrant Indian spice market in the background..." : "e.g., A cinematic slow-motion video of a family enjoying a healthy meal..."}
              className="w-full p-6 pr-20 bg-white border border-black/5 rounded-[2rem] shadow-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none min-h-[120px] resize-none text-lg font-medium placeholder:text-text-secondary/40"
              disabled={isGenerating}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || (!hasApiKey && mode === 'video')}
              className={cn(
                "absolute bottom-4 right-4 p-4 rounded-2xl transition-all shadow-lg",
                isGenerating || !prompt.trim() || (!hasApiKey && mode === 'video')
                  ? "bg-black/5 text-text-secondary cursor-not-allowed"
                  : "bg-accent text-white hover:bg-accent-light active:scale-95 shadow-accent/20"
              )}
            >
              <Send size={24} />
            </button>
          </div>

          {!hasApiKey && mode === 'video' && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-amber-800 text-xs">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">API Key Required for Video Generation</p>
                <p>To use Veo video generation, you must select a paid Google Cloud project API key. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline font-bold">Learn more about billing</a>.</p>
                <button 
                  onClick={handleSelectKey}
                  className="mt-2 text-accent font-bold hover:underline"
                >
                  Select Key Now
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2">Suggestions:</span>
            {[
              "Make it cinematic",
              "Add vibrant colors",
              "Hyper-realistic",
              "Family friendly",
              "Indian aesthetic"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setPrompt(prev => prev + (prev ? ' ' : '') + suggestion)}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/5 text-text-secondary hover:bg-accent/10 hover:text-accent transition-colors"
                disabled={isGenerating}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-8 text-center border-t border-black/5 mt-auto">
        <p className="text-xs text-text-secondary font-medium">
          Powered by Gemini 3.1 & Veo • AI can make mistakes. Check important info.
        </p>
      </footer>
    </div>
  );
};
