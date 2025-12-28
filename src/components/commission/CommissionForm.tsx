'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  FormatBadge,
} from '@/components/ui';
import { PricingCalculator } from './PricingCalculator';
import { FORMAT_ORDER, FORMAT_DESCRIPTIONS, isExpressAvailable, hasCatalogueOption } from '@/lib/pricing';
import type { PublicationFormat } from '@/types';
import { cn } from '@/lib/utils';

const commissionSchema = z.object({
  format: z.enum(['BRIEF', 'DOSSIER', 'REVIEW', 'FILE']),
  topic: z.string().min(10, 'Topic must be at least 10 characters'),
  sector: z.string().min(1, 'Sector is required'),
  region: z.string().min(1, 'Region is required'),
  isPrivate: z.boolean(),
  catalogueInclusion: z.boolean(),
  expressDelivery: z.boolean(),
  legalConfirmation: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms',
  }),
});

type CommissionFormData = z.infer<typeof commissionSchema>;

export function CommissionForm() {
  const t = useTranslations('commission');
  const formatT = useTranslations('formats');

  const [selectedFormat, setSelectedFormat] = useState<PublicationFormat>('BRIEF');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CommissionFormData>({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      format: 'BRIEF',
      isPrivate: true,
      catalogueInclusion: false,
      expressDelivery: false,
      legalConfirmation: false,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: CommissionFormData) => {
    // TODO: Implement form submission
    console.log('Commission submitted:', data);
    alert('Commission request submitted! (Demo)');
  };

  const handleFormatChange = (format: PublicationFormat) => {
    setSelectedFormat(format);
    setValue('format', format);
    // Reset express delivery if not available for the format
    if (!isExpressAvailable(format)) {
      setValue('expressDelivery', false);
    }
    // Reset catalogue inclusion if not available for the format
    if (!hasCatalogueOption(format)) {
      setValue('catalogueInclusion', false);
    }
  };

  const sectorOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'energy', label: 'Energy' },
    { value: 'finance', label: 'Finance' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'other', label: 'Other' },
  ];

  const regionOptions = [
    { value: 'global', label: 'Global' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia-Pacific' },
    { value: 'mena', label: 'MENA' },
    { value: 'latam', label: 'Latin America' },
    { value: 'africa', label: 'Africa' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Format Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-neutral-700">
          {t('form.format')} <span className="text-error">*</span>
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FORMAT_ORDER.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => handleFormatChange(format)}
              className={cn(
                'border p-4 text-left',
                selectedFormat === format
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              )}
            >
              <FormatBadge format={format} size="sm" />
              <p className="mt-2 text-xs text-neutral-600">
                {FORMAT_DESCRIPTIONS[format].role}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Topic */}
      <Textarea
        label={t('form.topic')}
        placeholder={t('form.topicPlaceholder')}
        error={errors.topic?.message}
        required
        {...register('topic')}
      />

      {/* Sector and Region */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label={t('form.sector')}
          options={sectorOptions}
          placeholder="Select sector"
          error={errors.sector?.message}
          required
          {...register('sector')}
        />
        <Select
          label={t('form.region')}
          options={regionOptions}
          placeholder="Select region"
          error={errors.region?.message}
          required
          {...register('region')}
        />
      </div>

      {/* Options */}
      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <h3 className="font-medium text-neutral-900">{t('form.status')}</h3>

        {/* Publication Status - Only for REVIEW and FILE */}
        {hasCatalogueOption(selectedFormat) && (
          <Checkbox
            label={t('form.statusOptions.catalogue')}
            {...register('catalogueInclusion')}
          />
        )}

        {/* Express Delivery */}
        {isExpressAvailable(selectedFormat) && (
          <div>
            <Checkbox
              label={t('form.expressDelivery')}
              {...register('expressDelivery')}
            />
            <p className="ml-8 mt-1 text-xs text-neutral-500">
              {t('form.expressNote')}
            </p>
          </div>
        )}
      </div>

      {/* Pricing Calculator */}
      <PricingCalculator
        input={{
          format: selectedFormat,
          isPrivate: !watchedValues.catalogueInclusion,
          catalogueInclusion: watchedValues.catalogueInclusion,
          expressDelivery: watchedValues.expressDelivery,
        }}
      />

      {/* Legal Confirmation */}
      <Checkbox
        label={t('form.legalConfirmation')}
        error={errors.legalConfirmation?.message}
        {...register('legalConfirmation')}
      />

      {/* Submit */}
      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
        {t('form.submit')}
      </Button>
    </form>
  );
}
