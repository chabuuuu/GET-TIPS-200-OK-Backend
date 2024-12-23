import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { User } from '@/models/user.model';
import { IUserService } from '@/service/interface/i.user.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
  public common: IBaseCrudController<User>;
  private userService: IUserService<User>;
  constructor(
    @inject('UserService') userService: IUserService<User>,
    @inject(ITYPES.Controller) common: IBaseCrudController<User>
  ) {
    this.userService = userService;
    this.common = common;
  }

  /**
   * * POST /api/users/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await this.userService.login(username, password);
      return res.send_ok('Login success', user);
    } catch (error) {
      next(error);
    }
  }
}
