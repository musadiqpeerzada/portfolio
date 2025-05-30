export type PostFrontMatter = {
  title: string;
  date: string;
  tags: string[];
  lastmod?: string;
  draft?: boolean;
  summary?: string;
  images?: string[];
  authors?: string[];
  layout?: string;
  readingTime: any;
  views?: number;
  canonicalUrl?: string;
  slug: string;
  fileName: string;
};
