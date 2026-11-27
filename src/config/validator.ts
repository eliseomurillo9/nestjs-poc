export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'test' | 'production';
  AUTH_DOMAIN: string
  AUTH_AUDIENCE: string;
  DATABASE_URL: string
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const required = (key: string): string => {
    const value = config[key];

    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(
        `Missing or invalid environment variable: ${key}`,
      );
    }

    return value;
  };

  const port = Number(config.PORT ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be between 1 and 65535');
  }

  const nodeEnv = config.NODE_ENV ?? 'development';

  if (
    nodeEnv !== 'development' &&
    nodeEnv !== 'test' &&
    nodeEnv !== 'production'
  ) {
    throw new Error('Invalid NODE_ENV');
  }

  const domain = required('AUTH_DOMAIN');

  try {
    const url = new URL(domain);
    if (url.protocol !== 'https:') {
      throw new Error();
    }
  } catch {
    throw new Error('AUTH0_ISSUER must be a valid HTTPS URL');
  }

  return {
    NODE_ENV: nodeEnv,
    AUTH_DOMAIN: domain,
    AUTH_AUDIENCE: required('AUTH_AUDIENCE'),
    DATABASE_URL: required('DATABASE_URL')
  };
}