import { Request } from 'express';

export interface RequestWithId<I> extends Request<undefined, undefined, I> {
  user?: {
    _id: string;
  };
}
