import Script from 'next/script';
import siteMetadata from '@/data/siteMetadata';

const RybbitScript = () => {
  return (
    <>
      <Script
        src='https://app.rybbit.io/api/script.js'
        data-site-id={siteMetadata.analytics.rybbitSiteId}
        defer
      />
    </>
  );
};

export default RybbitScript;
