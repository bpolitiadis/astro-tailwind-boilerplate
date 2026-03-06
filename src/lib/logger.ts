import pino from 'pino';

const isDevelopment = import.meta.env.DEV;
const isVercel = import.meta.env.VERCEL === '1';

type PinoLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

const ALLOWED_LEVELS: readonly PinoLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

function resolveLogLevel(): PinoLevel {
  const envLevel = (import.meta.env.LOG_LEVEL as string | undefined)?.toLowerCase();
  if (envLevel && (ALLOWED_LEVELS as readonly string[]).includes(envLevel)) {
    return envLevel as PinoLevel;
  }
  return isDevelopment ? 'debug' : 'info';
}

const useStructuredLogs =
  String(import.meta.env.ENABLE_STRUCTURED_LOGGING ?? '').toLowerCase() === 'true';

const baseConfig: pino.LoggerOptions = {
  level: resolveLogLevel(),
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label: string) => ({ level: label }),
    log: (object: Record<string, unknown>) => ({
      ...object,
      env:
        (import.meta.env.LOG_ENVIRONMENT as string | undefined) ??
        (isVercel ? 'vercel' : isDevelopment ? 'development' : 'production'),
    }),
  },
};

const devTransport: pino.TransportSingleOptions | undefined = useStructuredLogs
  ? undefined
  : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    };

export const logger = pino(
  isDevelopment ? { ...baseConfig, transport: devTransport } : baseConfig,
);

/** Child logger pre-tagged for API route handlers. */
export const apiLogger = logger.child({ context: 'api' });

/** Create a context-scoped child logger for any module. */
export function createLogger(context: string, fields: Record<string, unknown> = {}) {
  return logger.child({ context, ...fields });
}

export function logError(error: Error, context: Record<string, unknown> = {}) {
  logger.error({
    msg: 'Application Error',
    error: { name: error.name, message: error.message, stack: error.stack },
    ...context,
  });
}

export function logRequest(req: Request, startTime: number) {
  const url = new URL(req.url);
  apiLogger.info({
    msg: 'API Request',
    method: req.method,
    url: url.pathname,
    query: url.search,
    userAgent: req.headers.get('user-agent') ?? 'unknown',
    ip: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown',
    startTime,
  });
}

export function logResponse(req: Request, response: Response, startTime: number) {
  const url = new URL(req.url);
  const status = response.status;
  const responseTime = Date.now() - startTime;
  const level = status >= 400 ? 'warn' : 'info';

  apiLogger[level]({
    msg: 'API Response',
    method: req.method,
    url: url.pathname,
    status,
    responseTime,
    success: status < 400,
  });
}

export type { PinoLevel };
