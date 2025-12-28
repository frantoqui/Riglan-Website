import type { PricingConfig, PublicationFormat } from '@/types';

export const PRICING_CONFIG: PricingConfig = {
  basePrice: {
    BRIEF: 2400,
    DOSSIER: 7900,
    REVIEW: 14900,
    FILE: 49900,
  },
  privatePremium: {
    BRIEF: 0,
    DOSSIER: 0,
    REVIEW: 2000,
    FILE: 5000,
  },
  expressDeliveryMultiplier: {
    BRIEF: null, // Not available
    DOSSIER: 0.2,
    REVIEW: 0.2,
    FILE: 0.3,
  },
};

export const FORMAT_ORDER: PublicationFormat[] = ['BRIEF', 'DOSSIER', 'REVIEW', 'FILE'];

export const FORMAT_DESCRIPTIONS = {
  BRIEF: {
    role: 'Structural contraction',
    perimeter: 'Narrow, focused',
  },
  DOSSIER: {
    role: 'Structured exposition',
    perimeter: 'System-level',
  },
  REVIEW: {
    role: 'Structural comparison',
    perimeter: 'Multiple configurations',
  },
  FILE: {
    role: 'Structural exhaustivity',
    perimeter: 'Full admissible',
  },
} as const;
