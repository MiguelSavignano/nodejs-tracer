# Nodejs tracer

Use decorators for trace your class methods

[![npm package](https://img.shields.io/npm/v/nodejs-tracer.svg)](https://www.npmjs.com/package/nodejs-tracer) [![code documentation](https://img.shields.io/badge/Code-documentation-blue.svg)](https://miguelsavignano.github.io/nodejs-tracer/globals.html)
[![Maintainability](https://api.codeclimate.com/v1/badges/8b4c8280e6801cce4ad6/maintainability)](https://codeclimate.com/github/MiguelSavignano/nodejs-tracer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8b4c8280e6801cce4ad6/test_coverage)](https://api.codeclimate.com/v1/badges/8b4c8280e6801cce4ad6/test_coverage)

## Install

```
npm install nodejs-tracer --save
```

## Usage

## Request context

Help to trace called methods in the same request.

Request context, generate one uuid per request.

Install request-context

```
npm install request-context --save
```

Example:

- Configure express app with request-context middleware

```js
import { ContextService } from 'nodejs-tracer';

const app = express();
app.use(ContextService.middlewareRequest());
app.use(ContextService.middlewareRequestUUID());
```

### Extends

Extend request context, you can create more traces in the middleware.

Example:

```js
import { ContextService } from 'nodejs-tracer';

const app = express();
app.use(ContextService.middlewareRequest());
app.use(ContextService.middlewareRequestUUID());
app.use(
  ContextService.middleware({
    addTraces(req, _res) {
      this.set('request:ip', req.ip);
    },
  }),
);
```
