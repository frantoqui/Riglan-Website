'use client';

import { useTranslations } from 'next-intl';
import { Select } from '@/components/ui';
import type { PublicationFormat } from '@/types';
import { FORMAT_ORDER } from '@/lib/pricing';

export interface PublicationFiltersProps {
  selectedFormat?: PublicationFormat;
  selectedRegion?: string;
  selectedDomain?: string;
  regions: string[];
  domains: string[];
  onFormatChange: (format?: PublicationFormat) => void;
  onRegionChange: (region?: string) => void;
  onDomainChange: (domain?: string) => void;
}

export function PublicationFilters({
  selectedFormat,
  selectedRegion,
  selectedDomain,
  regions,
  domains,
  onFormatChange,
  onRegionChange,
  onDomainChange,
}: PublicationFiltersProps) {
  const t = useTranslations('publications.filters');
  const formatT = useTranslations('formats');

  const formatOptions = [
    { value: '', label: t('all') },
    ...FORMAT_ORDER.map((format) => ({
      value: format,
      label: formatT(format),
    })),
  ];

  const regionOptions = [
    { value: '', label: t('all') },
    ...regions.map((region) => ({ value: region, label: region })),
  ];

  const domainOptions = [
    { value: '', label: t('all') },
    ...domains.map((domain) => ({ value: domain, label: domain })),
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Select
          label={t('format')}
          options={formatOptions}
          value={selectedFormat || ''}
          onChange={(e) =>
            onFormatChange(e.target.value ? (e.target.value as PublicationFormat) : undefined)
          }
        />
      </div>
      <div className="flex-1">
        <Select
          label={t('region')}
          options={regionOptions}
          value={selectedRegion || ''}
          onChange={(e) => onRegionChange(e.target.value || undefined)}
        />
      </div>
      <div className="flex-1">
        <Select
          label={t('domain')}
          options={domainOptions}
          value={selectedDomain || ''}
          onChange={(e) => onDomainChange(e.target.value || undefined)}
        />
      </div>
    </div>
  );
}
