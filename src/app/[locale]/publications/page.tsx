'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/layout';
import { Input } from '@/components/ui';
import { PublicationCard, PublicationFilters } from '@/components/publications';
import {
  samplePublications,
  getUniqueRegions,
  getUniqueDomains,
} from '@/lib/data/sample-publications';
import type { PublicationFormat } from '@/types';

export default function PublicationsPage() {
  const t = useTranslations('publications');
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<PublicationFormat | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>();

  const regions = getUniqueRegions(samplePublications);
  const domains = getUniqueDomains(samplePublications);

  // Filter publications
  const filteredPublications = samplePublications.filter((publication) => {
    // Search filter
    if (searchQuery) {
      const title =
        locale === 'es' && publication.titleEs
          ? publication.titleEs.toLowerCase()
          : publication.title.toLowerCase();
      const abstract =
        locale === 'es' && publication.abstractEs
          ? publication.abstractEs.toLowerCase()
          : publication.abstract.toLowerCase();
      const query = searchQuery.toLowerCase();
      if (!title.includes(query) && !abstract.includes(query)) {
        return false;
      }
    }

    // Format filter
    if (selectedFormat && publication.format !== selectedFormat) {
      return false;
    }

    // Region filter
    if (selectedRegion && publication.region !== selectedRegion) {
      return false;
    }

    // Domain filter
    if (selectedDomain && publication.domain !== selectedDomain) {
      return false;
    }

    return true;
  });

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-sm">
        <Container>
          <h1 className="font-serif text-3xl font-bold text-primary-900 md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700">{t('description')}</p>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="border-b border-neutral-200 py-6">
        <Container>
          <div className="space-y-4">
            <Input
              type="search"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <PublicationFilters
              selectedFormat={selectedFormat}
              selectedRegion={selectedRegion}
              selectedDomain={selectedDomain}
              regions={regions}
              domains={domains}
              onFormatChange={setSelectedFormat}
              onRegionChange={setSelectedRegion}
              onDomainChange={setSelectedDomain}
            />
          </div>
        </Container>
      </section>

      {/* Publications Grid */}
      <section className="py-section-md">
        <Container>
          {filteredPublications.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-600">{t('noResults')}</p>
          )}
        </Container>
      </section>

      {/* Format Descriptions */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-section-md">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(['BRIEF', 'DOSSIER', 'REVIEW', 'FILE'] as const).map((format) => (
              <div key={format}>
                <h3 className="font-serif font-semibold text-primary-900">{format}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {t(`formatDescriptions.${format}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
