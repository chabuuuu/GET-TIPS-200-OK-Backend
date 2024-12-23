import { ErrorCode } from '@/enums/error-code.enums';
import accountRouter from '@/routes/account.route';
import postRouter from '@/routes/post.route';
import roleRouter from '@/routes/role.route';
import sessionRouter from '@/routes/session.route';
import userRouter from '@/routes/user.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any, root_api: string) {
  app.use(`${root_api}/session`, sessionRouter);
  app.use(`${root_api}/posts`, postRouter);
  app.use(`${root_api}/users`, userRouter);
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
