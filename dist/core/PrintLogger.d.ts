export interface ILogger {
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
}
export interface IPrintLogOptions {
    Logger?: ILogger;
    parseResult?: (value: any) => any;
    parseArguments?: (value: any[]) => any[];
    parseError?: (value: any | Error) => any | Error;
}
export interface IPrintLogProxyOptions {
    className?: string;
    parseResult?: (value: any) => any;
    parseArguments?: (value: any[]) => any[];
    parseError?: (value: any | Error) => any | Error;
}
export declare const PrintLogProxy: ({ Logger }: {
    Logger: any;
}) => (instance: any, methodName: any, options?: IPrintLogProxyOptions) => void;
export declare const PrintLog: ({ Logger, ...options }: IPrintLogOptions) => (target: any, methodName: any, descriptor: any) => void;
export declare class DecoratorProxy {
    private originalFnc;
    private className;
    private methodName;
    private Logger;
    private loggerOptions;
    contextTag: string;
    constructor(originalFnc: any, className: any, methodName: any, Logger: any, loggerOptions?: IPrintLogOptions);
    build(): any;
    apply(target: any, thisArg: any, args: any): any;
    printMessage(message: string, value: any, type?: "before" | "after"): void;
    printMessageResult(result: any): void;
    printMessageError(error: any): void;
    parseError(error: any | Error): any | string;
    parseArguments(value: any[]): any[];
    parseResult(value: any): any;
}
