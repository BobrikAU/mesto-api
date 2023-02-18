import { Response } from 'express';
import { RequestWithId } from '../types/interfaces';
import User from '../models/user';
import CodesErrors from '../types/codesErrors';

export const handleError = (err: any, res: Response) => {
  if (err.name === 'CastError' && err.path === '_id') {
    return res.status(CodesErrors.NotFound).json({
      message: 'Запрошенный рользователь не найден',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(CodesErrors.BadReq).json({
      message: `Переданы некорректные данные: ${err.message}`,
    });
  }
  return res.status(CodesErrors.Default).json({
    message: `Произошла ошибка: ${err}`,
  });
};

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
    res.status(400).json({ message: 'Id пользователя не передано' });
  }
}
