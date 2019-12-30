import { ContextService } from './ContextService';

export interface ILogger {
  log(message: any, tags?: string): void;
  error(message: any, tags?: string): void;
  warn(message: any, tags?: string): void;
}

export interface ILoggerFormatter {
  format(message: any, tags: string, contextTags: string[]);
}

export class Logger {
  constructor(private formatter: ILoggerFormatter) {}

  log(message: any, tags?: string) {
    console.log(this.formatter.format(message, tags, ContextService.tags()));
  }

  error(message: any, tags?: string) {
    console.error(this.formatter.format(message, tags, ContextService.tags()));
  }

  warn(message: any, tags?: string) {
    console.warn(this.formatter.format(message, tags, ContextService.tags()));
  }

  setFormatter(formatter: ILoggerFormatter) {
    this.formatter = formatter;
  }
}

export class LoggerJSONFormat implements ILoggerFormatter {
  format(message: any, tags: string, contextTags: string[]) {
    try {
      return JSON.stringify({ tags: this.allTags(tags, contextTags), message });
    } catch {
      return { tags: this.allTags(tags, contextTags), message };
    }
  }

  private allTags(tags: string, contextTags: string[]) {
    return [...contextTags, ...tags];
  }
}

export class LoggerTextFormat implements ILoggerFormatter {
  format(message: any, tags: string, contextTags: string[]) {
    return `${this.allTags(tags, contextTags)} ${message}`;
  }

  private allTags(tags: string, contextTags: string[]) {
    if (!contextTags.length) return tags;
    const contextTagsString = contextTags.map(tag => `[${tag}]`).join(' ');

    return `${contextTagsString} ${tags}`;
  }
}

const logger = new Logger(new LoggerTextFormat());
export default logger;
