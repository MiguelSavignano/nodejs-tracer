import { ContextService } from '../../ContextService';
import Logger from '../../index';
import * as request from 'supertest';
import * as express from 'express';

describe('App middleware custom', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(ContextService.middlewareRequest());
    app.use(
      ContextService.middleware((context, req, res) => {
        context.set('request:ip', req.ip);
      }),
    );

    app.get('/test', async (req, res) => {
      Logger.log('Start request');
      res.send('');
    });
  });
  it('trace with ip', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

    await request(app)
      .get('/test')
      .expect(200);

    expect(spy.mock.calls[0][0]).toEqual('[::ffff:127.0.0.1] Start request');
  });
});
