"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextStore = require("request-context");
const uuid = require("uuid/v4");
class ContextService {
    static middlewareRequest() {
        return ContextStore.middleware('request');
    }
    static middlewareRequestUUID() {
        return (req, _res, next) => {
            this.set('request:id', uuid());
            next();
        };
    }
    static middleware(callback) {
        return (_req, _res, next) => {
            callback(this, _req, _res);
            next();
        };
    }
    static set(key, value) {
        ContextStore.set(key, value);
        this.tracesKeys.add(key);
    }
    static tags() {
        return Array.from(this.tracesKeys).map(traceKey => {
            return ContextStore.get(traceKey);
        });
    }
}
ContextService.tracesKeys = new Set();
exports.ContextService = ContextService;
