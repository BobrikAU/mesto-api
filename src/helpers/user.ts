import { Response } from 'express';
import { RequestWithId } from '../types/interfaces';
import User from '../models/user';

export const handleError = (err: any, res: Response) => res.status(500).json({
  massage: `Произошла ошибка: ${err}`,
  err,
});

interface IBody {
  [name: string]: string;
}
export async function updateInfo<T>(req: RequestWithId<T>, res: Response, body: IBody) {
  if (req.user) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, body, { returnDocument: 'after' })
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  } else {
    res.status(400).json({ massage: 'Id пользователя не передано' });
  }
}
