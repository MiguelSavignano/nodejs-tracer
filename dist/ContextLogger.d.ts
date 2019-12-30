import { ContextService } from './ContextService';
export interface ILogger {
    log(message: any, tags?: string): void;
    error(message: any, tags?: string): void;
    warn(message: any, tags?: string): void;
}
export interface ILoggerFormatter {
    format(message: any, tags: string, contextTags: string[]): any;
}
export declare class Logger {
    private formatter;
    private contextService;
    constructor(formatter: ILoggerFormatter, contextService?: typeof ContextService);
    log(message: any, tags?: string): void;
    error(message: any, tags?: string): void;
    warn(message: any, tags?: string): void;
    setFormatter(formatter: ILoggerFormatter): void;
}
export declare class JSONFormatter implements ILoggerFormatter {
    format(message: any, tags: string, contextTags: string[]): string | {
        tags: string[];
        message: any;
    };
    protected allTags(tags: string, contextTags: string[]): string[];
}
export declare class TextFormatter implements ILoggerFormatter {
    format(message: any, tags: string, contextTags: string[]): string;
    protected allTags(tags: string, contextTags: string[]): string;
}
