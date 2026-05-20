import { describe, expect, it } from 'vitest';

import { resolveAnalyticsConfig } from './analytics';

describe('analytics helpers', () => {
  it('returns null outside production or when required values are missing', () => {
    expect(
      resolveAnalyticsConfig({
        PROD: false,
        PUBLIC_ANALYTICS_SCRIPT_URL: 'https://analytics.example.com/script.js',
        PUBLIC_ANALYTICS_WEBSITE_ID: 'site-id',
      }),
    ).toBeNull();

    expect(
      resolveAnalyticsConfig({
        PROD: true,
        PUBLIC_ANALYTICS_SCRIPT_URL: 'https://analytics.example.com/script.js',
      }),
    ).toBeNull();
  });

  it('returns a trimmed analytics config in production', () => {
    expect(
      resolveAnalyticsConfig({
        PROD: true,
        PUBLIC_ANALYTICS_SCRIPT_URL: ' https://analytics.example.com/script.js ',
        PUBLIC_ANALYTICS_WEBSITE_ID: ' site-id ',
        PUBLIC_ANALYTICS_DOMAINS: ' klkuo.guru ',
      }),
    ).toEqual({
      enabled: true,
      scriptUrl: 'https://analytics.example.com/script.js',
      websiteId: 'site-id',
      domains: 'klkuo.guru',
    });
  });
});
