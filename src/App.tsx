import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { ForgotPassword } from './components/ForgotPassword';
import { QuizPage } from './components/QuizPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SuccessScreen } from './components/SuccessScreen';
import { FamilySetup } from './components/FamilySetup';
import { Dashboard } from './components/Dashboard';
import { LogMealSelection } from './components/LogMealSelection';
import { PlanMeal } from './components/PlanMeal';
import { History } from './components/History';
import { Insights } from './components/Insights';
import { FamilyAnalytics } from './components/FamilyAnalytics';
import { Settings } from './components/Settings';
import { EditMember } from './components/EditMember';
import { MealAnalysis } from './components/MealAnalysis';
import { LogMealInput } from './components/LogMealInput';
import { AIGenerator } from './components/AIGenerator';
import { GroceryList } from './components/GroceryList';
import { PriyaChat } from './components/PriyaChat';
import { ChatPage } from './components/ChatPage';
import { Screen, FamilyMember, OnboardingData } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Sarah', ageRange: '26-35', relationship: 'Self', healthConditions: [], dietaryPreferences: [], avatar: '👩‍🍳', role: 'Adult' },
    { id: '2', name: 'David', ageRange: '36-45', relationship: 'Spouse', healthConditions: ['Cholesterol'], dietaryPreferences: ['Low-oil'], avatar: '👨‍💼', role: 'Adult' },
    { id: '3', name: 'Leo', ageRange: '6-12', relationship: 'Child', healthConditions: [], dietaryPreferences: [], avatar: '👦', role: 'Child' },
  ]);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);
  const [logMethod, setLogMethod] = useState<'photo' | 'text' | 'voice'>('text');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingPage 
            onStart={() => navigate('onboarding-1')} 
            onLogin={() => navigate('login')}
            onQuiz={() => navigate('quiz')}
            onAIStudio={() => navigate('ai-studio')}
          />
        );
      case 'quiz':
        return <QuizPage onBack={() => navigate('landing')} />;
      case 'login':
        return (
          <LoginPage 
            onLogin={() => navigate('dashboard')} 
            onBack={() => navigate('landing')} 
            onForgotPassword={() => navigate('forgot-password')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPassword 
            onBack={() => navigate('login')} 
          />
        );
      case 'onboarding-1':
      case 'onboarding-2':
      case 'onboarding-3':
      case 'onboarding-4':
        return (
          <OnboardingFlow 
            step={parseInt(currentScreen.split('-')[1])} 
            onComplete={(data) => {
              setOnboardingData(data);
              navigate('onboarding-success');
            }}
            onBack={() => {
              const step = parseInt(currentScreen.split('-')[1]);
              if (step === 1) navigate('landing');
              else navigate(`onboarding-${step - 1}` as Screen);
            }}
            onNext={(step) => navigate(`onboarding-${step + 1}` as Screen)}
          />
        );
      case 'onboarding-success':
        return <SuccessScreen onContinue={() => navigate('family-setup')} />;
      case 'family-setup':
        return (
          <FamilySetup 
            members={familyMembers} 
            onAdd={() => {
              setEditingMember(null);
              navigate('edit-member');
            }}
            onEdit={(member) => {
              setEditingMember(member);
              navigate('edit-member');
            }}
            onSave={() => navigate('dashboard')}
            onNavigate={navigate}
          />
        );
      case 'edit-member':
        return (
          <EditMember 
            member={editingMember} 
            onSave={(member) => {
              if (editingMember) {
                setFamilyMembers(prev => prev.map(m => m.id === member.id ? member : m));
              } else {
                setFamilyMembers(prev => [...prev, { ...member, id: Math.random().toString() }]);
              }
              navigate('family-setup');
            }}
            onCancel={() => navigate('family-setup')}
            onNavigate={navigate}
          />
        );
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'log-meal-selection':
        return (
          <LogMealSelection 
            onNavigate={(screen, method) => {
              if (method) setLogMethod(method as any);
              navigate(screen);
            }} 
            onOpenChat={() => setIsChatOpen(true)}
          />
        );
      case 'log-meal-input':
        return (
          <LogMealInput 
            method={logMethod} 
            onNavigate={navigate} 
            onAnalysisComplete={(analysis) => setLastAnalysis(analysis)} 
          />
        );
      case 'chat-page':
        return (
          <ChatPage 
            onNavigate={navigate} 
            onAnalysisComplete={(analysis) => setLastAnalysis(analysis)} 
          />
        );
      case 'plan-meal':
        return <PlanMeal onNavigate={navigate} />;
      case 'history':
        return <History onNavigate={navigate} />;
      case 'insights':
        return <Insights onNavigate={navigate} />;
      case 'family-analytics':
        return <FamilyAnalytics onNavigate={navigate} />;
      case 'settings':
        return <Settings onNavigate={navigate} />;
      case 'grocery-list':
        return <GroceryList onNavigate={navigate} />;
      case 'meal-analysis':
        return <MealAnalysis analysis={lastAnalysis} onNavigate={navigate} />;
      case 'ai-studio':
        return (
          <AIGenerator 
            onBack={() => navigate('landing')} 
            initialImage="https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=1000"
          />
        );
      default:
        return (
          <LandingPage 
            onStart={() => navigate('onboarding-1')} 
            onLogin={() => navigate('login')}
            onQuiz={() => navigate('quiz')}
            onAIStudio={() => navigate('ai-studio')}
          />
        );
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-bg-primary overflow-x-hidden relative w-full"
    )}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      
      {/* Global Priya Chat */}
      <PriyaChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Global Priya Trigger (only on app screens) */}
      {!['landing', 'login', 'forgot-password', 'quiz', 'onboarding-1', 'onboarding-2', 'onboarding-3', 'onboarding-4', 'onboarding-success', 'log-meal-input'].includes(currentScreen) && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 bg-gradient-to-br from-accent to-accent-light text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 z-40 active:scale-95 transition-transform"
        >
          <Headphones size={20} />
          <span className="font-bold text-sm">Priya</span>
        </button>
      )}
    </div>
  );
}
