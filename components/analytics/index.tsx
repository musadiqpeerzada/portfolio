/* eslint-disable @typescript-eslint/no-explicit-any */
import GA from './GoogleAnalytics';
import Plausible from './Plausible';
import RybbitScript from './Rybbit';
import SimpleAnalytics from './SimpleAnalytics';
import Umami from './Umami';
import siteMetadata from '@/data/siteMetadata';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
    sa_event?: (...args: any[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && (
        <Plausible />
      )}
      {siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}
      {siteMetadata.analytics.googleAnalyticsId && <GA />}
      {siteMetadata.analytics.rybbitSiteId && <RybbitScript />}
    </>
  );
};

export default Analytics;
