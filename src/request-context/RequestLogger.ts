import { Logger } from '../NodejsLogger';
import { ContextService } from './ContextService';

export class RequestLogger {
  constructor(private ContextService) {}

  log(message: any, context?: string) {
    Logger.log(message, `${this.buildTags()}${context}`);
  }

  warn(message: any, context?: string) {
    Logger.warn(message, `${this.buildTags()}${context}`);
  }

  error(error: any, context?: string) {
    Logger.error(error, `${this.buildTags()}${context}`);
  }

  buildTags() {
    return this.ContextService.printTags();
  }
}

export default new RequestLogger(ContextService);
