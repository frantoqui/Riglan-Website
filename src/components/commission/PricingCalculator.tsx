'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { calculatePrice, type PricingInput } from '@/lib/pricing';
import { cn } from '@/lib/utils';

export interface PricingCalculatorProps {
  input: PricingInput;
}

export function PricingCalculator({ input }: PricingCalculatorProps) {
  const t = useTranslations('commission.pricing');
  const pricing = calculatePrice(input);

  return (
    <Card className="bg-neutral-50">
      <CardHeader>
        <CardTitle as="h3" className="text-lg">
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Base Price */}
        <div className="flex items-center justify-between">
          <span className="text-neutral-700">{t('basePrice')}</span>
          <span className="font-medium">{pricing.formatted.basePrice}</span>
        </div>

        {/* Private Premium */}
        {pricing.privatePremium > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-neutral-700">{t('privatePremium')}</span>
            <span className="font-medium text-amber-700">
              +{pricing.formatted.privatePremium}
            </span>
          </div>
        )}

        {/* Express Delivery */}
        {pricing.expressDeliveryFee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-neutral-700">{t('expressDeliverySurcharge')}</span>
            <span className="font-medium text-amber-700">
              +{pricing.formatted.expressDeliveryFee}
            </span>
          </div>
        )}

        {/* Catalogue Discount */}
        {pricing.catalogueDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-neutral-700">{t('catalogueDiscount')}</span>
            <span className="font-medium text-success">
              -{pricing.formatted.catalogueDiscount}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-neutral-300 pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary-900">{t('total')}</span>
            <span className="text-xl font-bold text-primary-900">
              {pricing.formatted.total}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
