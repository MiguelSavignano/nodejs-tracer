import requestLogger from '../RequestLogger';

jest.mock('uuid/v1');

describe('RequestLogger', () => {
  it('#log', () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    requestLogger.log('Message', 'MyTag');
    expect(spy.mock.calls[0][0]).toEqual('MyTag Message');
    expect(spy).toBeCalled();
  });
});
