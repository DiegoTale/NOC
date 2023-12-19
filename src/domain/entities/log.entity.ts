export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel; // Enum
  public message: string;
  public createAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    // if( !message ) throw new Error('Message is requiredd')

    const log = new LogEntity(message, level);
    log.createAt = new Date(createdAt);

    return log;
  };
}
