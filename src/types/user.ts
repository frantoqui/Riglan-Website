export interface User {
  id: string;
  cognitoUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  country?: string;
  preferredLanguage: 'en' | 'es';
  stripeCustomerId?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  organization?: string;
  country?: string;
  preferredLanguage: 'en' | 'es';
}
