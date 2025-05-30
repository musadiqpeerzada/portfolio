import Head from 'next/head';
import { useRouter } from 'next/router';
import siteMetadata from '@/data/siteMetadata';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { PostFrontMatter } from 'types/PostFrontMatter';

interface CommonSEOProps {
  title: string;
  description: string;
  ogType: string;
  ogImage:
    | string
    | {
        '@type': string;
        url: string;
      }[];
  twImage: string;
  canonicalUrl?: string;
  tags?: string[];
}

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
  tags,
}: CommonSEOProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      {tags && <meta name='keywords' content={tags.join(', ')} />}
      <meta
        property='og:url'
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => (
          <meta property='og:image' content={url} key={url} />
        ))
      ) : (
        <meta property='og:image' content={ogImage} key={ogImage} />
      )}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={siteMetadata.twitter} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={twImage} />
      <link
        rel='canonical'
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
        }
      />
    </Head>
  );
};

interface PageSEOProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export const PageSEO = ({ title, description, imageUrl }: PageSEOProps) => {
  const ogImageUrl =
    siteMetadata.siteUrl + (imageUrl ?? siteMetadata.socialBanner);
  const twImageUrl =
    siteMetadata.siteUrl + (imageUrl ?? siteMetadata.socialBanner);

  return (
    <CommonSEO
      title={title}
      description={description}
      ogType='website'
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  );
};

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  const router = useRouter();
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType='website'
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  );
};

interface BlogSeoProps extends PostFrontMatter {
  authorDetails?: AuthorFrontMatter[];
  url: string;
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
  tags,
}: BlogSeoProps) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images;

  const featuredImages = imagesArr.map(img => {
    return {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}${img}`,
    };
  });

  let authorList;
  if (authorDetails) {
    authorList = authorDetails.map(author => {
      return {
        '@type': 'Person',
        name: author.name,
      };
    });
  } else {
    authorList = {
      '@type': 'Person',
      name: siteMetadata.author,
    };
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType='article'
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
        tags={tags}
      />
      <Head>
        {date && (
          <meta property='article:published_time' content={publishedAt} />
        )}
        {lastmod && (
          <meta property='article:modified_time' content={modifiedAt} />
        )}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
