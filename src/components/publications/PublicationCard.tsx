'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, Button, FormatBadge } from '@/components/ui';
import { formatCurrency } from '@/lib/pricing';
import { truncateText } from '@/lib/utils';
import type { Publication } from '@/types';
import { TOCPreviewModal } from './TOCPreviewModal';

export interface PublicationCardProps {
  publication: Publication;
  locale: string;
}

export function PublicationCard({ publication, locale }: PublicationCardProps) {
  const t = useTranslations('publications.card');
  const [showTOC, setShowTOC] = useState(false);

  const title = locale === 'es' && publication.titleEs ? publication.titleEs : publication.title;
  const abstract =
    locale === 'es' && publication.abstractEs ? publication.abstractEs : publication.abstract;

  return (
    <>
      <Card className="flex h-full flex-col">
        <CardContent className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <FormatBadge format={publication.format} size="sm" />
            <span className="text-sm text-neutral-500">{publication.region}</span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-primary-900">
            {title}
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            {truncateText(abstract, 150)}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium text-primary-800">
              {formatCurrency(publication.price)}
            </span>
            <span className="text-xs text-neutral-500">{publication.domain}</span>
          </div>
        </CardContent>

        <CardFooter className="border-t border-neutral-100 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTOC(true)}
            className="flex-1"
          >
            {t('viewStructure')}
          </Button>
          <Button variant="primary" size="sm" className="flex-1">
            {t('acquire')}
          </Button>
        </CardFooter>
      </Card>

      <TOCPreviewModal
        publication={publication}
        locale={locale}
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
      />
    </>
  );
}
