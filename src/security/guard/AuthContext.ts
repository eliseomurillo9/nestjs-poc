import { Request } from 'express';

export interface AuthContext extends Request {
  auth: {
    scopes: string;
    userId: string;
  };
}