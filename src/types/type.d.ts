import type { Express, Request, Response, NextFunction, Errback } from "express";

export interface User {
  username: string;
  password: string
}

export interface RequestConfig extends Request {
 
}
