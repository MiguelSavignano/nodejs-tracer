import * as ContextStore from 'request-context';
import * as uuid from 'uuid/v4';

interface IContextServiceStore {
  set: (key: string, value: any) => void;
  tags: () => string[];
}

export class ContextService {
  // store unique traces
  static tracesKeys = new Set();

  static middlewareRequest() {
    return ContextStore.middleware('request');
  }

  static middlewareRequestUUID() {
    return (req, _res, next) => {
      this.set('request:id', uuid());
      next();
    };
  }

  static middleware(
    callback: (context: IContextServiceStore, req, res) => void,
  ) {
    return (_req, _res, next) => {
      callback(this, _req, _res);
      next();
    };
  }

  static set(key: string, value: any) {
    ContextStore.set(key, value);
    this.tracesKeys.add(key);
  }

  static tags(): string[] {
    return Array.from(this.tracesKeys).map(traceKey => {
      return ContextStore.get(traceKey);
    });
  }
}
