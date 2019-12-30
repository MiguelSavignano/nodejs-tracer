"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextLogger_1 = require("./ContextLogger");
const logger = new ContextLogger_1.Logger(new ContextLogger_1.TextFormatter());
exports.default = logger;
