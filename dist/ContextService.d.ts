interface IContextServiceStore {
    set: (key: string, value: any) => void;
    tags: () => string[];
}
export declare class ContextService {
    static tracesKeys: Set<any>;
    static middlewareRequest(): any;
    static middlewareRequestUUID(): (req: any, _res: any, next: any) => void;
    static middleware(callback: (context: IContextServiceStore, req: any, res: any) => void): (_req: any, _res: any, next: any) => void;
    static set(key: string, value: any): void;
    static tags(): string[];
}
export {};
