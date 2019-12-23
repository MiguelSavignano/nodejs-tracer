"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextStore = require("request-context");
const uuid = require("uuid/v4");
class ContextService {
    static middlewareRequest() {
        return ContextStore.middleware("request");
    }
    static addTraces(_req, _res) {
        this.setTraceByUuid();
    }
    static setTraceByUuid(key = "request:id") {
        this.set(key, uuid());
    }
    static middleware({ addTraces = this.addTraces } = {}) {
        return (req, _res, next) => {
            addTraces.bind(this)(req, _res);
            next();
        };
    }
    static set(key, value) {
        ContextStore.set(key, value);
        this.tracesKeys.add(key);
    }
    static printTags() {
        const tags = Array.from(this.tracesKeys).map(traceKey => {
            return ContextStore.get(traceKey);
        });
        return tags.map(this.printTag).join("");
    }
    static printTag(value) {
        return value ? `${value}] [` : "";
    }
}
ContextService.tracesKeys = new Set();
exports.ContextService = ContextService;
