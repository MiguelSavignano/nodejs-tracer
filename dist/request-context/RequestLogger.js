"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodejsLogger_1 = require("../NodejsLogger");
const ContextService_1 = require("./ContextService");
class RequestLogger {
    constructor(ContextService) {
        this.ContextService = ContextService;
    }
    log(message, context) {
        NodejsLogger_1.Logger.log(message, `${this.buildTags()}${context}`);
    }
    warn(message, context) {
        NodejsLogger_1.Logger.warn(message, `${this.buildTags()}${context}`);
    }
    error(error, context) {
        NodejsLogger_1.Logger.error(error, `${this.buildTags()}${context}`);
    }
    buildTags() {
        return this.ContextService.printTags();
    }
}
exports.RequestLogger = RequestLogger;
exports.default = new RequestLogger(ContextService_1.ContextService);
