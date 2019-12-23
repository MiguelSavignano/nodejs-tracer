export declare class ContextService {
    static tracesKeys: Set<any>;
    static middlewareRequest(): any;
    static addTraces(_req: any, _res: any): void;
    static setTraceByUuid(key?: string): void;
    static middleware({ addTraces }?: {
        addTraces?: typeof ContextService.addTraces;
    }): (req: any, _res: any, next: any) => void;
    static set(key: string, value: any): void;
    static printTags(): string;
    private static printTag;
}
