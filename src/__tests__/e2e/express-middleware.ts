import { ContextService } from '../../ContextService';
import Logger from '../../index';

import * as request from 'supertest';
import * as express from 'express';
import * as uuid from 'uuid/v4';
jest.mock('uuid/v4');

describe('App middleware', () => {
  let app;
  beforeEach(() => {
    app = undefined;
    app = express();
    app.use(ContextService.middlewareRequest());
    app.use(ContextService.middlewareRequestUUID());

    const service = async () => {
      Logger.log('async log');
    };

    app.get('/test', async (req, res) => {
      Logger.log('Start request');
      await service();
      res.send('');
    });
  });

  it('generate uuid per request', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

    await request(app)
      .get('/test')
      .expect(200);
    expect(spy).toBeCalled();

    // In the same request generate only one uuid
    expect(uuid).toBeCalledTimes(1);
    expect(spy).toBeCalledTimes(2);

    await request(app)
      .get('/test')
      .expect(200);

    expect(spy).toBeCalled();

    // generate new uuid for new request
    expect(uuid).toBeCalledTimes(2);
    expect(spy).toBeCalledTimes(4);
  });
});
