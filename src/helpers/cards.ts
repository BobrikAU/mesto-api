import { Response } from 'express';

export const handleError = (err: any, res: Response) => res.status(500).json({
  massage: `Произошла ошибка: ${err}`,
});

export const lll = () => {};
