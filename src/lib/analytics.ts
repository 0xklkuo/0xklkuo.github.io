type AnalyticsEnv = {
  PROD?: boolean;
  MODE?: string;
  PUBLIC_ANALYTICS_SCRIPT_URL?: string;
  PUBLIC_ANALYTICS_WEBSITE_ID?: string;
  PUBLIC_ANALYTICS_DOMAINS?: string;
};

export type AnalyticsConfig = {
  enabled: boolean;
  scriptUrl: string;
  websiteId: string;
  domains?: string;
};

function normalizeOptionalValue(value?: string): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function resolveAnalyticsConfig(env: AnalyticsEnv): AnalyticsConfig | null {
  const scriptUrl = normalizeOptionalValue(env.PUBLIC_ANALYTICS_SCRIPT_URL);
  const websiteId = normalizeOptionalValue(env.PUBLIC_ANALYTICS_WEBSITE_ID);
  const domains = normalizeOptionalValue(env.PUBLIC_ANALYTICS_DOMAINS);
  const isProduction = env.PROD ?? env.MODE === 'production';

  if (!isProduction || !scriptUrl || !websiteId) {
    return null;
  }

  return {
    enabled: true,
    scriptUrl,
    websiteId,
    domains,
  };
}
