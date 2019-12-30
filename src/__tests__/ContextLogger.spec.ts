import { Logger, TextFormatter, JSONFormatter } from '../ContextLogger';
import { ContextService } from '../ContextService';

jest.mock('uuid/v1');

class ContextServiceMock extends ContextService {
  static tags() {
    return ['UUID'];
  }
}

class CustomJSONFormatter extends JSONFormatter {
  protected allTags(tags: string, contextTags: string[]) {
    const allTags = super.allTags(tags, contextTags);
    return ['my-first-service', ...allTags];
  }
}

describe('Logger', () => {
  describe('with Text format', () => {
    let contextLogger = new Logger(new TextFormatter(), ContextServiceMock);

    it('#log', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

      contextLogger.log('Message', 'MyTag');
      contextLogger.log('Message');

      expect(spy.mock.calls[0][0]).toEqual('[UUID] [MyTag] Message');
      expect(spy.mock.calls[1][0]).toEqual('[UUID] Message');
      expect(spy).toBeCalled();
    });
  });

  describe('with JSON format', () => {
    let contextLogger = new Logger(new JSONFormatter(), ContextServiceMock);

    it('#log', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

      contextLogger.log({ data: [{ id: 1 }] }, 'SERVICE_1_RESPONSE');

      expect(spy.mock.calls[0][0]).toEqual(
        '{"tags":["UUID","SERVICE_1_RESPONSE"],"message":{"data":[{"id":1}]}}',
      );
      expect(spy).toBeCalled();
    });
  });

  describe('with custom format', () => {
    let contextLogger = new Logger(new JSONFormatter(), ContextServiceMock);

    it('#setFormatter', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

      contextLogger.setFormatter(new CustomJSONFormatter());

      contextLogger.log({ data: [{ id: 1 }] }, 'SERVICE_1_RESPONSE');

      expect(spy.mock.calls[0][0]).toEqual(
        '{"tags":["my-first-service","UUID","SERVICE_1_RESPONSE"],"message":{"data":[{"id":1}]}}',
      );
      expect(spy).toBeCalled();
    });
  });
});
