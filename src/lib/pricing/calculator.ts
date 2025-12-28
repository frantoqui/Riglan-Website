import type { PricingInput, PricingBreakdown, PublicationFormat } from '@/types';
import { PRICING_CONFIG } from './constants';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePrice(params: PricingInput): PricingBreakdown {
  const { format, isPrivate, catalogueInclusion, expressDelivery } = params;

  const basePrice = PRICING_CONFIG.basePrice[format];
  let privatePremium = 0;
  let expressDeliveryFee = 0;
  let catalogueDiscount = 0;

  // Private premium (only for REVIEW and FILE)
  if (isPrivate && (format === 'REVIEW' || format === 'FILE')) {
    privatePremium = PRICING_CONFIG.privatePremium[format];
  }

  // Catalogue inclusion removes private premium
  if (catalogueInclusion && privatePremium > 0) {
    catalogueDiscount = privatePremium;
    privatePremium = 0;
  }

  // Express delivery (not available for BRIEF)
  if (expressDelivery && format !== 'BRIEF') {
    const multiplier = PRICING_CONFIG.expressDeliveryMultiplier[format];
    if (multiplier !== null) {
      expressDeliveryFee = Math.round(basePrice * multiplier);
    }
  }

  const total = basePrice + privatePremium + expressDeliveryFee - catalogueDiscount;

  return {
    basePrice,
    privatePremium,
    expressDeliveryFee,
    catalogueDiscount,
    total,
    formatted: {
      basePrice: formatCurrency(basePrice),
      privatePremium: formatCurrency(privatePremium),
      expressDeliveryFee: formatCurrency(expressDeliveryFee),
      catalogueDiscount: formatCurrency(catalogueDiscount),
      total: formatCurrency(total),
    },
  };
}

export function isExpressAvailable(format: PublicationFormat): boolean {
  return PRICING_CONFIG.expressDeliveryMultiplier[format] !== null;
}

export function hasCatalogueOption(format: PublicationFormat): boolean {
  return format === 'REVIEW' || format === 'FILE';
}

export function getExpressMultiplier(format: PublicationFormat): number {
  const multiplier = PRICING_CONFIG.expressDeliveryMultiplier[format];
  return multiplier ?? 0;
}
