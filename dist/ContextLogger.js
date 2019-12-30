"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextService_1 = require("./ContextService");
class Logger {
    constructor(formatter, contextService = ContextService_1.ContextService) {
        this.formatter = formatter;
        this.contextService = contextService;
    }
    log(message, tags) {
        console.log(this.formatter.format(message, tags, this.contextService.tags()));
    }
    error(message, tags) {
        console.error(this.formatter.format(message, tags, this.contextService.tags()));
    }
    warn(message, tags) {
        console.warn(this.formatter.format(message, tags, this.contextService.tags()));
    }
    setFormatter(formatter) {
        this.formatter = formatter;
    }
}
exports.Logger = Logger;
class JSONFormatter {
    format(message, tags, contextTags) {
        try {
            return JSON.stringify({ tags: this.allTags(tags, contextTags), message });
        }
        catch {
            return { tags: this.allTags(tags, contextTags), message };
        }
    }
    allTags(tags, contextTags) {
        return [...contextTags, tags];
    }
}
exports.JSONFormatter = JSONFormatter;
class TextFormatter {
    format(message, tags, contextTags) {
        return `${this.allTags(tags, contextTags)} ${message}`;
    }
    allTags(tags, contextTags) {
        if (!contextTags.length)
            return tags;
        const contextTagsString = contextTags.map(tag => `[${tag}]`).join(' ');
        return tags ? `${contextTagsString} [${tags}]` : contextTagsString;
    }
}
exports.TextFormatter = TextFormatter;
