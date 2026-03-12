import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Weight, Activity, Heart, Thermometer, Droplets, ShieldAlert, Plus, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { OnboardingData, HealthMetrics } from '../types';

interface OnboardingFlowProps {
  step: number;
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
  onNext: (step: number) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ step, onComplete, onBack, onNext }) => {
  const [formData, setFormData] = useState<OnboardingData>({
    userProfile: { name: '', ageRange: '', role: '', healthMetrics: {} },
    healthFocus: [],
    mealPattern: '',
    guidanceStyle: ''
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const calculateBMI = (w?: string, h?: string) => {
    if (!w || !h) return '--';
    const weight = parseFloat(w);
    const height = parseFloat(h) / 100;
    if (isNaN(weight) || isNaN(height) || height === 0) return '--';
    return (weight / (height * height)).toFixed(1);
  };

  const updateMetric = (key: keyof HealthMetrics, value: string) => {
    setFormData(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        healthMetrics: {
          ...(prev.userProfile.healthMetrics || {}),
          [key]: value
        }
      }
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      onComplete(formData);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <h2 className="text-2xl font-serif">Setting up your family nutrition profile</h2>
        <p className="text-text-secondary">Tailoring Priya to your household...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      {/* Navigation */}
      <header className="px-8 py-12 flex items-center justify-between max-w-6xl mx-auto w-full relative">
        <button onClick={onBack} className="p-2 text-text-secondary hover:text-text-primary transition-colors">
          <ChevronLeft size={24} />
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-secondary">Step {step} of 4</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "h-[3px] transition-all duration-500",
                  s === step ? "w-10 bg-accent" : "w-10 bg-black/5"
                )} 
              />
            ))}
          </div>
        </div>

        <button className="text-sm font-bold text-text-secondary hover:text-text-primary uppercase tracking-widest">Skip</button>
      </header>

      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        {step === 1 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-serif leading-tight">Let's start with you</h1>
              <p className="text-lg text-text-secondary">We'll personalize nutrition guidance for your family.</p>
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary ml-4">First name</label>
                <input 
                  type="text" 
                  value={formData.userProfile.name}
                  onChange={(e) => setFormData({ ...formData, userProfile: { ...formData.userProfile, name: e.target.value } })}
                  placeholder="e.g. Ananya"
                  className="glass-input w-full p-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary ml-4">Email</label>
                <input 
                  type="email" 
                  value={formData.userProfile.email || ''}
                  onChange={(e) => setFormData({ ...formData, userProfile: { ...formData.userProfile, email: e.target.value } })}
                  placeholder="e.g. ananya@example.com"
                  className="glass-input w-full p-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary ml-4">Password</label>
                <input 
                  type="password" 
                  value={formData.userProfile.password || ''}
                  onChange={(e) => setFormData({ ...formData, userProfile: { ...formData.userProfile, password: e.target.value } })}
                  placeholder="Enter your password"
                  className="glass-input w-full p-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-text-secondary ml-4">Age range</label>
                <div className="relative">
                  <select 
                    value={formData.userProfile.ageRange}
                    onChange={(e) => setFormData({ ...formData, userProfile: { ...formData.userProfile, ageRange: e.target.value } })}
                    className="glass-input w-full p-6 appearance-none cursor-pointer pr-12"
                  >
                    <option value="">Select range</option>
                    {['18-25', '26-35', '36-45', '46-55', '56+'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-sm font-bold text-text-secondary ml-4">Your primary role</label>
                <div className="grid gap-4">
                  {[
                    { id: 'cook', label: 'I cook most meals' },
                    { id: 'planner', label: 'I plan groceries & menus' },
                    { id: 'helper', label: 'I help out occasionally' }
                  ].map(role => (
                    <button
                      key={role.id}
                      onClick={() => setFormData({ ...formData, userProfile: { ...formData.userProfile, role: role.id } })}
                      className={cn(
                        "p-6 rounded-full border text-left transition-all text-lg",
                        formData.userProfile.role === role.id 
                          ? "bg-accent/10 border-accent text-accent font-bold shadow-sm" 
                          : "bg-white/40 backdrop-blur-md border-white/30 text-text-primary hover:bg-white/60"
                      )}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-text-secondary italic mt-8">"We use this to tailor nutrition advice to your lifestyle."</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-serif leading-tight">Any health focus areas?</h1>
              <p className="text-lg text-text-secondary">Select topics to personalize your family's nutrition journey.</p>
            </div>

            <div className="space-y-6">
              {[
                { id: 'weight', label: 'Weight & Height', icon: <Weight size={24} />, section: 'Weight and Height' },
                { id: 'sugar', label: 'Sugar Level', icon: <Activity size={24} />, section: 'Sugar Level' },
                { id: 'bp', label: 'Blood Pressure', icon: <Heart size={24} />, section: 'Blood Pressure' },
                { id: 'thyroid', label: 'Thyroid', icon: <Thermometer size={24} />, section: 'Thyroid' },
                { id: 'uric', label: 'Uric Acid', icon: <Droplets size={24} />, section: 'Uric Acid' },
                { id: 'cholesterol', label: 'Cholesterol', icon: <ShieldAlert size={24} />, section: 'Cholesterol' }
              ].map(item => (
                <div key={item.id} className="border border-black/5 rounded-[2rem] overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => {
                      const exists = formData.healthFocus.includes(item.id);
                      setFormData({
                        ...formData,
                        healthFocus: exists 
                          ? formData.healthFocus.filter(id => id !== item.id)
                          : [...formData.healthFocus, item.id]
                      });
                      if (!exists) {
                        setExpandedSections(prev => [...prev, item.section]);
                      }
                    }}
                    className={cn(
                      "w-full p-6 flex items-center justify-between transition-all",
                      formData.healthFocus.includes(item.id) ? "bg-accent text-white" : "bg-white text-text-primary"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        formData.healthFocus.includes(item.id) ? "bg-white/20" : "bg-black/5"
                      )}>
                        {item.icon}
                      </div>
                      <span className="text-lg font-bold">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {formData.healthFocus.includes(item.id) && <Check size={20} />}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(item.section);
                        }}
                        className="p-1 hover:bg-black/5 rounded-full transition-colors"
                      >
                        <ChevronRight size={20} className={cn("transition-transform", expandedSections.includes(item.section) ? "rotate-90" : "")} />
                      </button>
                    </div>
                  </button>

                  {expandedSections.includes(item.section) && (
                    <div className="p-8 space-y-8 bg-white">
                      {item.id === 'weight' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current Weight (kg)</label>
                              <input 
                                type="text" 
                                value={formData.userProfile.healthMetrics?.weight || ''}
                                onChange={(e) => updateMetric('weight', e.target.value)}
                                placeholder="e.g. 68"
                                className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Height (cm)</label>
                              <input 
                                type="text" 
                                value={formData.userProfile.healthMetrics?.height || ''}
                                onChange={(e) => updateMetric('height', e.target.value)}
                                placeholder="e.g. 162"
                                className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-bg-primary p-6 rounded-3xl space-y-2">
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current BMI</p>
                              <p className="text-2xl font-bold">{calculateBMI(formData.userProfile.healthMetrics?.weight, formData.userProfile.healthMetrics?.height)}</p>
                            </div>
                            <div className="bg-bg-primary p-6 rounded-3xl space-y-2">
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target BMI</p>
                              <p className="text-2xl font-bold">{calculateBMI(formData.userProfile.healthMetrics?.targetWeight, formData.userProfile.healthMetrics?.height)}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target Weight (kg)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.targetWeight || ''}
                              onChange={(e) => updateMetric('targetWeight', e.target.value)}
                              placeholder="e.g. 60"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </>
                      )}

                      {item.id === 'sugar' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Fasting Sugar (mg/dL)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.fastingSugar || ''}
                              onChange={(e) => updateMetric('fastingSugar', e.target.value)}
                              placeholder="e.g. 110"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.targetFastingSugar || ''}
                              onChange={(e) => updateMetric('targetFastingSugar', e.target.value)}
                              placeholder="Target"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </div>
                      )}

                      {item.id === 'bp' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current BP (e.g. 130/85)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.currentBp || ''}
                              onChange={(e) => updateMetric('currentBp', e.target.value)}
                              placeholder="Enter value"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.targetBp || ''}
                              onChange={(e) => updateMetric('targetBp', e.target.value)}
                              placeholder="Target"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </div>
                      )}

                      {item.id === 'thyroid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current TSH (mIU/L)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.currentTsh || ''}
                              onChange={(e) => updateMetric('currentTsh', e.target.value)}
                              placeholder="Enter value"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.targetTsh || ''}
                              onChange={(e) => updateMetric('targetTsh', e.target.value)}
                              placeholder="Target"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </div>
                      )}

                      {item.id === 'uric' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current (mg/dL)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.currentUricAcid || ''}
                              onChange={(e) => updateMetric('currentUricAcid', e.target.value)}
                              placeholder="Enter value"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.targetUricAcid || ''}
                              onChange={(e) => updateMetric('targetUricAcid', e.target.value)}
                              placeholder="Target"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </div>
                      )}

                      {item.id === 'cholesterol' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">LDL (mg/dL)</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.ldl || ''}
                              onChange={(e) => updateMetric('ldl', e.target.value)}
                              placeholder="e.g. 130"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                            <input 
                              type="text" 
                              value={formData.userProfile.healthMetrics?.ldlTarget || ''}
                              onChange={(e) => updateMetric('ldlTarget', e.target.value)}
                              placeholder="Target"
                              className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button className="w-full p-6 rounded-[2rem] border border-dashed border-black/20 flex items-center gap-4 text-text-secondary hover:bg-black/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <Plus size={24} />
                </div>
                <span className="font-bold">Add other concern</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-serif leading-tight">How does your typical dinner look?</h1>
            </div>

            <div className="grid gap-6">
              {[
                { id: 'traditional', label: 'Rice + Dal + Sabzi', sub: 'A classic balanced meal', emoji: '🍛' },
                { id: 'roti', label: 'Roti + Sabzi', sub: 'Light and fiber-rich', emoji: '🫓' },
                { id: 'protein', label: 'Proteins + Salads', sub: 'Low carb focus', emoji: '🥗' },
                { id: 'mixed', label: 'Other / Mixed', sub: 'Varied international meals', emoji: '🍱' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFormData({ ...formData, mealPattern: item.id })}
                  className={cn(
                    "p-8 rounded-[2rem] border text-left transition-all flex items-center gap-6",
                    formData.mealPattern === item.id
                      ? "bg-accent/10 border-accent shadow-md"
                      : "bg-white/40 backdrop-blur-md border-white/30 hover:bg-white/60"
                  )}
                >
                  <span className="text-5xl">{item.emoji}</span>
                  <div className="flex-1">
                    <h3 className={cn("text-xl font-bold", formData.mealPattern === item.id ? "text-accent" : "text-text-primary")}>{item.label}</h3>
                    <p className="text-sm text-text-secondary mt-1">{item.sub}</p>
                  </div>
                  {formData.mealPattern === item.id && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-serif leading-tight">How should we guide you?</h1>
              <p className="text-lg text-text-secondary">Choose a communication style that fits your parenting flow.</p>
            </div>

            <div className="grid gap-6">
              {[
                { id: 'gentle', label: 'Gentle nudges', sub: 'Kind reminders and soft encouragement' },
                { id: 'direct', label: 'Direct and practical', sub: 'Straightforward advice and actionable steps' },
                { id: 'data', label: 'Data-driven insights', sub: 'Detailed charts and nutritional breakdowns' },
                { id: 'minimal', label: 'Minimal suggestions', sub: 'Quiet support only when needed' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFormData({ ...formData, guidanceStyle: item.id })}
                  className={cn(
                    "p-8 rounded-[2rem] border text-left transition-all",
                    formData.guidanceStyle === item.id
                      ? "bg-accent/10 border-accent shadow-md"
                      : "bg-white/40 backdrop-blur-md border-white/30 hover:bg-white/60"
                  )}
                >
                  <h3 className={cn("text-xl font-bold", formData.guidanceStyle === item.id ? "text-accent" : "text-text-primary")}>{item.label}</h3>
                  <p className="text-sm text-text-secondary mt-2">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="p-12 max-w-2xl mx-auto w-full">
        <button 
          onClick={() => step === 4 ? handleComplete() : onNext(step)}
          disabled={step === 1 && (!formData.userProfile.name || !formData.userProfile.email || !formData.userProfile.password || !formData.userProfile.ageRange || !formData.userProfile.role)}
          className="pill-button-primary w-full py-6 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
        >
          {step === 4 ? 'Finish' : 'Continue'} <ChevronRight size={24} />
        </button>
      </footer>
    </div>
  );
};
