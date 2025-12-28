import type { PublicationFormat } from './publication';

export type CommissionStatus =
  | 'submitted'
  | 'under_review'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'rejected';

export interface Commission {
  id: string;
  commissionNumber: string;
  userId: string;
  userEmail: string;
  status: CommissionStatus;

  // Form fields
  format: PublicationFormat;
  title: string;
  description: string;
  region: string;
  domain: string;
  isPrivate: boolean;
  catalogueInclusion: boolean;
  expressDelivery: boolean;

  // Pricing
  basePrice: number;
  privatePremium: number;
  expressDeliveryFee: number;
  catalogueDiscount: number;
  totalQuote: number;

  // Dates
  requestedDeliveryDate?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;

  // Admin
  assignedTo?: string;
  adminNotes?: string;
  rejectionReason?: string;

  // Result
  resultingPublicationId?: string;
  orderId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CommissionFormData {
  format: PublicationFormat;
  topic: string;
  description: string;
  sector: string;
  region: string;
  isPrivate: boolean;
  catalogueInclusion: boolean;
  expressDelivery: boolean;
  preferredDeliveryDate?: string;
  additionalNotes?: string;
}
