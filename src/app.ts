import createError from "http-errors";
import express from "express"
import type { Express, Request, Response, NextFunction, Errback } from "express";

import commonMiddleware from "./middlewares/common.middleware.ts";
import registerRouters from "./routes/index.ts";

import('./plugins/mysql/database.ts');

const app: Express = express();

commonMiddleware(app);
await registerRouters(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {  
  // set locals, only providing error in development
  if (err) {
    console.error(err)
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
