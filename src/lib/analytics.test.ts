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

  it('falls back to MODE when PROD is not provided', () => {
    expect(
      resolveAnalyticsConfig({
        MODE: 'production',
        PUBLIC_ANALYTICS_SCRIPT_URL: 'https://analytics.example.com/script.js',
        PUBLIC_ANALYTICS_WEBSITE_ID: 'site-id',
      }),
    ).toEqual({
      enabled: true,
      scriptUrl: 'https://analytics.example.com/script.js',
      websiteId: 'site-id',
      domains: undefined,
    });
  });

  it('trims production analytics values and ignores whitespace-only config', () => {
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

    expect(
      resolveAnalyticsConfig({
        PROD: true,
        PUBLIC_ANALYTICS_SCRIPT_URL: '   ',
        PUBLIC_ANALYTICS_WEBSITE_ID: 'site-id',
      }),
    ).toBeNull();
  });
});
