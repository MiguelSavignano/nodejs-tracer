const consoleLog = console.log;
const consoleError = console.error;
const consoleWarn = console.warn;

export class Logger {
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
