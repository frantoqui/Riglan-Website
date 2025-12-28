export type PublicationFormat = 'BRIEF' | 'DOSSIER' | 'REVIEW' | 'FILE';

export interface TOCItem {
  level: 1 | 2 | 3;
  title: string;
  titleEs?: string;
  pageNumber: number;
}

export interface Publication {
  id: string;
  slug: string;
  format: PublicationFormat;
  title: string;
  titleEs?: string;
  abstract: string;
  abstractEs?: string;
  tableOfContents: TOCItem[];
  tableOfContentsEs?: TOCItem[];
  price: number;
  region: string;
  domain: string;
  publishDate: string;
  pageCount: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicationFilters {
  format?: PublicationFormat;
  region?: string;
  domain?: string;
  search?: string;
}
