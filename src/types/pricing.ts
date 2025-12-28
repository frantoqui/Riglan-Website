import type { PublicationFormat } from './publication';

export interface PricingConfig {
  basePrice: Record<PublicationFormat, number>;
  privatePremium: Record<PublicationFormat, number>;
  expressDeliveryMultiplier: Record<PublicationFormat, number | null>;
}

export interface PricingInput {
  format: PublicationFormat;
  isPrivate: boolean;
  catalogueInclusion: boolean;
  expressDelivery: boolean;
}

export interface PricingBreakdown {
  basePrice: number;
  privatePremium: number;
  expressDeliveryFee: number;
  catalogueDiscount: number;
  total: number;
  formatted: {
    basePrice: string;
    privatePremium: string;
    expressDeliveryFee: string;
    catalogueDiscount: string;
    total: string;
  };
}
