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
  constructor(
    private formatter: ILoggerFormatter,
    private contextService = ContextService,
  ) {}

  log(message: any, tags?: string) {
    console.log(
      this.formatter.format(message, tags, this.contextService.tags()),
    );
  }

  error(message: any, tags?: string) {
    console.error(
      this.formatter.format(message, tags, this.contextService.tags()),
    );
  }

  warn(message: any, tags?: string) {
    console.warn(
      this.formatter.format(message, tags, this.contextService.tags()),
    );
  }

  setFormatter(formatter: ILoggerFormatter) {
    this.formatter = formatter;
  }
}

export class JSONFormatter implements ILoggerFormatter {
  format(message: any, tags: string, contextTags: string[]) {
    try {
      return JSON.stringify({ tags: this.allTags(tags, contextTags), message });
    } catch {
      return { tags: this.allTags(tags, contextTags), message };
    }
  }

  protected allTags(tags: string, contextTags: string[]) {
    return [...contextTags, tags];
  }
}

export class TextFormatter implements ILoggerFormatter {
  format(message: any, tags: string, contextTags: string[]) {
    return `${this.allTags(tags, contextTags)} ${message}`;
  }

  protected allTags(tags: string, contextTags: string[]) {
    if (!contextTags.length) return tags;

    const contextTagsString = contextTags.map(tag => `[${tag}]`).join(' ');
    return tags ? `${contextTagsString} [${tags}]` : contextTagsString;
  }
}
