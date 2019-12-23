"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleLog = console.log;
const consoleError = console.error;
const consoleWarn = console.warn;
class Logger {
    static log(message, tags) {
        consoleLog(tags, message);
    }
    static error(message, tags) {
        consoleError(tags, message);
    }
    static warn(message, tags) {
        consoleWarn(tags, message);
    }
}
exports.Logger = Logger;
