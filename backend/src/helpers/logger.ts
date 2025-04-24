import winston from "winston";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
      transports: [new winston.transports.Console()],
    });
  }

  info(context: string, message: string): void {
    this.logger.info(`${context} - ${message}`);
  }

  warn(context: string, message: string): void {
    this.logger.warn(`${context} - ${message}`);
  }

  error(context: string, error: unknown): void {
    if (error instanceof Error) {
      this.logger.error(`${context} - ${error.message}\n${error.stack}`);
    } else {
      this.logger.error(`${context} - ${JSON.stringify(error)}`);
    }
  }
}

export default new Logger();
