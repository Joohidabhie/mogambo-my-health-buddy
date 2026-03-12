import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, Headphones, X, Home, History, BarChart3, Users, User, Check, Plus } from 'lucide-react';
import { FamilyMember, Screen } from '../types';
import { cn } from '../lib/utils';

interface EditMemberProps {
  member: FamilyMember | null;
  onSave: (member: FamilyMember) => void;
  onCancel: () => void;
  onNavigate: (screen: Screen) => void;
}

export const EditMember: React.FC<EditMemberProps> = ({ member, onSave, onCancel, onNavigate }) => {
  const [formData, setFormData] = useState<FamilyMember>(member || {
    id: '',
    name: '',
    ageRange: '',
    relationship: '',
    healthConditions: [],
    dietaryPreferences: [],
    avatar: '👤',
    role: 'Adult',
    healthMetrics: {}
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(['Weight and Height']);

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

  const updateMetric = (key: keyof NonNullable<FamilyMember['healthMetrics']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      healthMetrics: {
        ...(prev.healthMetrics || {}),
        [key]: value
      }
    }));
  };

  const healthOptions = ['Diabetes', 'Hypertension', 'Cholesterol', 'Thyroid', 'Underweight', 'None', 'Other'];
  const dietaryOptions = ['Vegetarian', 'Eggitarian', 'Vegan', 'Non-veg', 'Jain', 'Low-oil', 'No sugar'];

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(c => c !== condition)
        : [...prev.healthConditions, condition]
    }));
  };

  const toggleDietary = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter(p => p !== pref)
        : [...prev.dietaryPreferences, pref]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="text-accent" size={20} />
              </div>
              <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">Cancel</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-16 space-y-12">
        <div className="space-y-4">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold">{member ? 'Edit Member' : 'Add Member'}</h1>
          <p className="text-xl text-text-secondary">Tell us more about your family member to personalize their health journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Photo */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
              <div className="w-32 h-32 rounded-full bg-bg-primary flex items-center justify-center text-6xl mx-auto relative group cursor-pointer hover:shadow-inner transition-all">
                {formData.avatar}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                  <Camera size={32} className="text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">Profile Avatar</p>
                <button className="text-accent font-bold text-sm uppercase tracking-widest">Change Photo</button>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah"
                  className="w-full p-6 bg-white rounded-3xl border border-black/5 outline-none focus:border-accent transition-colors text-xl font-serif font-bold shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4">Age Range</label>
                  <select 
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full p-6 bg-white rounded-3xl border border-black/5 outline-none focus:border-accent transition-colors text-lg font-serif font-bold appearance-none shadow-sm"
                  >
                    <option value="">Select</option>
                    {['0–5', '6–12', '13–18', '19–25', '26–35', '36–45', '46–55', '56–65', '65+'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4">Relationship</label>
                  <select 
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full p-6 bg-white rounded-3xl border border-black/5 outline-none focus:border-accent transition-colors text-lg font-serif font-bold appearance-none shadow-sm"
                  >
                    <option value="">Select</option>
                    {['Self', 'Spouse', 'Child', 'Parent', 'Grandparent', 'Other'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4">Email (optional)</label>
              <input 
                type="email" 
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full p-6 bg-white rounded-3xl border border-black/5 outline-none focus:border-accent transition-colors text-xl font-serif font-bold shadow-sm"
              />
            </div>

            {/* Health Conditions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold">Any health considerations?</h3>
              <div className="flex flex-wrap gap-3">
                {healthOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => toggleCondition(opt)}
                    className={cn(
                      "px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest border transition-all",
                      formData.healthConditions.includes(opt)
                        ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                        : "bg-white text-text-secondary border-black/5 hover:bg-black/5"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold">Any dietary preferences?</h3>
              <div className="flex flex-wrap gap-3">
                {dietaryOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => toggleDietary(opt)}
                    className={cn(
                      "px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all border",
                      formData.dietaryPreferences.includes(opt)
                        ? "bg-accent border-accent text-white shadow-md"
                        : "bg-white text-text-secondary border-black/5 hover:bg-black/5"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Metrics Sections */}
            <div className="space-y-6 pt-8">
              <h3 className="text-2xl font-serif font-bold">Health Parameters</h3>
              
              {/* Weight and Height */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Weight and Height')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Weight and Height</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Weight and Height') && (
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current Weight (kg)</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.weight || ''}
                          onChange={(e) => updateMetric('weight', e.target.value)}
                          placeholder="e.g. 68"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Height (cm)</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.height || ''}
                          onChange={(e) => updateMetric('height', e.target.value)}
                          placeholder="e.g. 162"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-bg-primary p-6 rounded-3xl space-y-2">
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current BMI</p>
                        <p className="text-2xl font-bold">{calculateBMI(formData.healthMetrics?.weight, formData.healthMetrics?.height)}</p>
                      </div>
                      <div className="bg-bg-primary p-6 rounded-3xl space-y-2">
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target BMI</p>
                        <p className="text-2xl font-bold">{calculateBMI(formData.healthMetrics?.targetWeight, formData.healthMetrics?.height)}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target Weight (kg)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetWeight || ''}
                        onChange={(e) => updateMetric('targetWeight', e.target.value)}
                        placeholder="e.g. 60"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cholesterol */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Cholesterol')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Cholesterol</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Cholesterol') && (
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">LDL – Bad Cholesterol (mg/dL)</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.ldl || ''}
                          onChange={(e) => updateMetric('ldl', e.target.value)}
                          placeholder="e.g. 130"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.ldlTarget || ''}
                          onChange={(e) => updateMetric('ldlTarget', e.target.value)}
                          placeholder="Target"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">HDL – Good Cholesterol (mg/dL)</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.hdl || ''}
                          onChange={(e) => updateMetric('hdl', e.target.value)}
                          placeholder="e.g. 50"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.hdlTarget || ''}
                          onChange={(e) => updateMetric('hdlTarget', e.target.value)}
                          placeholder="Target"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Triglycerides (mg/dL)</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.triglycerides || ''}
                          onChange={(e) => updateMetric('triglycerides', e.target.value)}
                          placeholder="e.g. 150"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target</label>
                        <input 
                          type="text" 
                          value={formData.healthMetrics?.triglyceridesTarget || ''}
                          onChange={(e) => updateMetric('triglyceridesTarget', e.target.value)}
                          placeholder="Target"
                          className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thyroid */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Thyroid')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Thyroid</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Thyroid') && (
                  <div className="p-8 space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current TSH (mIU/L)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.currentTsh || ''}
                        onChange={(e) => updateMetric('currentTsh', e.target.value)}
                        placeholder="Enter current value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target TSH</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetTsh || ''}
                        onChange={(e) => updateMetric('targetTsh', e.target.value)}
                        placeholder="Enter target value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Uric Acid */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Uric Acid')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Uric Acid</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Uric Acid') && (
                  <div className="p-8 space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.currentUricAcid || ''}
                        onChange={(e) => updateMetric('currentUricAcid', e.target.value)}
                        placeholder="Enter current value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetUricAcid || ''}
                        onChange={(e) => updateMetric('targetUricAcid', e.target.value)}
                        placeholder="Enter target value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Blood Pressure */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Blood Pressure')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Blood Pressure</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Blood Pressure') && (
                  <div className="p-8 space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Current BP (e.g. 130/85)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.currentBp || ''}
                        onChange={(e) => updateMetric('currentBp', e.target.value)}
                        placeholder="Enter current value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target BP</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetBp || ''}
                        onChange={(e) => updateMetric('targetBp', e.target.value)}
                        placeholder="Enter target value"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sugar Level */}
              <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleSection('Sugar Level')}
                  className="w-full p-6 bg-accent text-white flex items-center justify-between"
                >
                  <span className="text-lg font-bold">Sugar Level</span>
                  <Check size={20} />
                </button>
                {expandedSections.includes('Sugar Level') && (
                  <div className="p-8 space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Fasting Sugar (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.fastingSugar || ''}
                        onChange={(e) => updateMetric('fastingSugar', e.target.value)}
                        placeholder="e.g. 110"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target Fasting Sugar (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetFastingSugar || ''}
                        onChange={(e) => updateMetric('targetFastingSugar', e.target.value)}
                        placeholder="e.g. 90"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Post Meal Sugar (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.postMealSugar || ''}
                        onChange={(e) => updateMetric('postMealSugar', e.target.value)}
                        placeholder="e.g. 160"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Target Post Meal Sugar (mg/dL)</label>
                      <input 
                        type="text" 
                        value={formData.healthMetrics?.targetPostMealSugar || ''}
                        onChange={(e) => updateMetric('targetPostMealSugar', e.target.value)}
                        placeholder="e.g. 140"
                        className="w-full p-4 border-b border-black/10 outline-none focus:border-accent transition-colors text-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full py-4 border-2 border-dashed border-black/10 rounded-3xl flex items-center justify-center gap-2 text-text-secondary font-bold hover:bg-black/5 transition-all">
                <Plus size={20} />
                <span>Add Other Concern</span>
              </button>
            </div>

            <div className="pt-12 flex gap-6">
              <button 
                onClick={() => onSave(formData)}
                disabled={!formData.name || !formData.ageRange || !formData.relationship}
                className="flex-1 py-6 rounded-3xl bg-accent text-white font-bold text-xl uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-2xl shadow-accent/20 disabled:opacity-50"
              >
                Save Member
              </button>
              <button onClick={onCancel} className="px-12 py-6 rounded-3xl bg-white border border-black/10 text-text-secondary font-bold text-xl uppercase tracking-[0.2em] hover:bg-black/5 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
