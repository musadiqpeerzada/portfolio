import siteMetadata from '@/data/siteMetadata';
import { google } from 'googleapis';

export async function getAnalyticsData(pageTitle) {
  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_ANALYTICS_CREDENTIALS, 'base64').toString(
        'utf-8',
      ),
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const authClient = await auth.getClient();
    // TODO: Remove any when the types are updated
    google.options({ auth: authClient as any });

    const analyticsData = google.analyticsdata('v1beta');
    const response = await analyticsData.properties.runReport({
      property: `properties/${siteMetadata.analytics.googlePropertyId}`,
      requestBody: {
        dimensions: [{ name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }],
        dateRanges: [{ startDate: '2020-08-13', endDate: 'today' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pageTitle',
            stringFilter: {
              value: pageTitle,
              matchType: 'EXACT',
            },
          },
        },
      },
    });
    if (response.data.rows && response.data.rows.length > 0) {
      const views = parseInt(response.data.rows[0].metricValues[0].value, 10);
      return { views };
    }
    return { views: 0 };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return { views: 0 };
  }
}
