'use client';

import { useTranslations } from 'next-intl';
import { Modal, FormatBadge, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/pricing';
import type { Publication, TOCItem } from '@/types';
import { cn } from '@/lib/utils';

export interface TOCPreviewModalProps {
  publication: Publication;
  locale: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TOCPreviewModal({
  publication,
  locale,
  isOpen,
  onClose,
}: TOCPreviewModalProps) {
  const t = useTranslations('publications.card');

  const title = locale === 'es' && publication.titleEs ? publication.titleEs : publication.title;
  const abstract =
    locale === 'es' && publication.abstractEs ? publication.abstractEs : publication.abstract;
  const toc =
    locale === 'es' && publication.tableOfContentsEs
      ? publication.tableOfContentsEs
      : publication.tableOfContents;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <FormatBadge format={publication.format} />
          <span className="text-lg font-semibold text-primary-800">
            {formatCurrency(publication.price)}
          </span>
        </div>

        {/* Abstract */}
        <div>
          <h4 className="mb-2 font-medium text-neutral-900">Abstract</h4>
          <p className="text-sm text-neutral-600">{abstract}</p>
        </div>

        {/* Table of Contents */}
        <div>
          <h4 className="mb-3 font-medium text-neutral-900">Table of Contents</h4>
          <ol className="space-y-1">
            {toc.map((item: TOCItem, index: number) => (
              <li
                key={index}
                className={cn(
                  'flex items-baseline justify-between py-1 text-sm',
                  item.level === 1 && 'font-medium text-neutral-900',
                  item.level === 2 && 'pl-4 text-neutral-700',
                  item.level === 3 && 'pl-8 text-neutral-600'
                )}
              >
                <span>{item.title}</span>
                <span className="ml-2 text-neutral-400">{item.pageNumber}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
          <span>
            <strong>Region:</strong> {publication.region}
          </span>
          <span>
            <strong>Domain:</strong> {publication.domain}
          </span>
          <span>
            <strong>Pages:</strong> {publication.pageCount}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-4 border-t border-neutral-200 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button variant="primary" className="flex-1">
            {t('acquire')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
