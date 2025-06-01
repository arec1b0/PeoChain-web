import winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'peochain-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (isDevelopment) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export function logError(error: Error, context?: string) {
  logger.error({
    message: error.message,
    stack: error.stack,
    context
  });
}

export function logInfo(message: string, meta?: any) {
  logger.info(message, meta);
}

export function logWarn(message: string, meta?: any) {
  logger.warn(message, meta);
}