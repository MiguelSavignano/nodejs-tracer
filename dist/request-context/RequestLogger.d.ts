export declare class RequestLogger {
    private ContextService;
    constructor(ContextService: any);
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(error: any, context?: string): void;
    buildTags(): any;
}
declare const _default: RequestLogger;
export default _default;
