"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CircularJSON = require("circular-json");
exports.PrintLogProxy = ({ Logger }) => (instance, methodName, options = {}) => {
    const className = options.className || instance.constructor.name;
    const original = instance[methodName];
    const proxy = new DecoratorProxy(original, className, methodName, Logger, options).build();
    instance[methodName] = proxy;
};
exports.PrintLog = ({ Logger, ...options }) => (target, methodName, descriptor) => {
    const className = target.constructor.name;
    const original = descriptor.value;
    const proxy = new DecoratorProxy(original, className, methodName, Logger, options).build();
    descriptor.value = proxy;
};
class DecoratorProxy {
    constructor(originalFnc, className, methodName, Logger, loggerOptions = {}) {
        this.originalFnc = originalFnc;
        this.className = className;
        this.methodName = methodName;
        this.Logger = Logger;
        this.loggerOptions = loggerOptions;
        this.contextTag = `${this.className}#${this.methodName}`;
    }
    build() {
        return new Proxy(this.originalFnc, {
            apply: this.apply.bind(this)
        });
    }
    apply(target, thisArg, args) {
        this.printMessage("Call with args:", this.parseArguments(args), "before");
        try {
            const fncResult = target.apply(thisArg, args);
            if (fncResult instanceof Promise) {
                fncResult
                    .then(result => this.printMessageResult(result))
                    .catch(error => {
                    this.printMessageError(error);
                });
                return fncResult;
            }
            else {
                this.printMessageResult(fncResult);
                return fncResult;
            }
        }
        catch (error) {
            this.printMessageError(error);
            throw error;
        }
    }
    printMessage(message, value, type) {
        const valueToPrint = typeof value === "string" ? value : CircularJSON.stringify(value);
        this.Logger.log(`${message} ${valueToPrint}`, this.contextTag);
    }
    printMessageResult(result) {
        this.printMessage("Return:", this.parseResult(result), "after");
    }
    printMessageError(error) {
        this.printMessage("Return:", this.parseError(error), "after");
    }
    parseError(error) {
        if (this.loggerOptions.parseError) {
            return this.loggerOptions.parseError(error);
        }
        if (error instanceof Error) {
            return error.message;
        }
        return error;
    }
    parseArguments(value) {
        if (this.loggerOptions.parseArguments) {
            return this.loggerOptions.parseArguments(value);
        }
        return value;
    }
    parseResult(value) {
        if (this.loggerOptions.parseResult) {
            return this.loggerOptions.parseResult(value);
        }
        return value;
    }
}
exports.DecoratorProxy = DecoratorProxy;
