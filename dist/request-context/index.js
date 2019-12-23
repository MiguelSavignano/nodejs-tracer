"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLogger_1 = require("./RequestLogger");
exports.RequestLogger = RequestLogger_1.default;
var ContextService_1 = require("./ContextService");
exports.ContextService = ContextService_1.ContextService;
const PrintLogger_1 = require("../core/PrintLogger");
exports.PrintLog = ({ Logger = RequestLogger_1.default, ...options } = {}) => PrintLogger_1.PrintLog({ Logger, ...options });
exports.PrintLogProxy = PrintLogger_1.PrintLogProxy({
    Logger: RequestLogger_1.default
});
