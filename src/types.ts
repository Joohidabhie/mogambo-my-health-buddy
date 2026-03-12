export type Screen = 
  | 'landing' 
  | 'login'
  | 'forgot-password'
  | 'quiz'
  | 'onboarding-1' 
  | 'onboarding-2' 
  | 'onboarding-3' 
  | 'onboarding-4' 
  | 'onboarding-success'
  | 'family-setup'
  | 'edit-member'
  | 'dashboard'
  | 'log-meal-selection'
  | 'plan-meal'
  | 'history'
  | 'insights'
  | 'family-analytics'
  | 'settings'
  | 'meal-analysis'
  | 'ai-studio'
  | 'log-meal-input'
  | 'grocery-list'
  | 'chat-page';

export interface HealthMetrics {
  weight?: string;
  height?: string;
  targetWeight?: string;
  ldl?: string;
  ldlTarget?: string;
  hdl?: string;
  hdlTarget?: string;
  triglycerides?: string;
  triglyceridesTarget?: string;
  currentTsh?: string;
  targetTsh?: string;
  currentUricAcid?: string;
  targetUricAcid?: string;
  currentBp?: string;
  targetBp?: string;
  fastingSugar?: string;
  targetFastingSugar?: string;
  postMealSugar?: string;
  targetPostMealSugar?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  ageRange: string;
  relationship: string;
  email?: string;
  healthConditions: string[];
  dietaryPreferences: string[];
  avatar: string;
  role: 'Adult' | 'Child' | 'Elder';
  healthMetrics?: HealthMetrics;
}

export interface UserProfile {
  name: string;
  email?: string;
  password?: string;
  ageRange: string;
  role: string;
  healthMetrics?: HealthMetrics;
}

export interface OnboardingData {
  userProfile: UserProfile;
  healthFocus: string[];
  mealPattern: string;
  guidanceStyle: string;
}
