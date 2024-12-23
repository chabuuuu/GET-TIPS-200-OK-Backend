import { TIME_CONSTANTS } from '@/constants/time.constants';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { User } from '@/models/user.model';
import { IUserRepository } from '@/repository/interface/i.user.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IUserService } from '@/service/interface/i.user.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

@injectable()
export class UserService extends BaseCrudService<User> implements IUserService<User> {
  private userRepository: IUserRepository<User>;

  constructor(@inject('UserRepository') userRepository: IUserRepository<User>) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  async login(username: any, password: any): Promise<string> {
    const user = await this.userRepository.findOne({
      filter: {
        username: username
      }
    });

    if (!user) {
      throw new BaseError(ErrorCode.NF_01, 'User not found');
    }

    if (user.password !== password) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const jwtClaim = new JwtClaimDto(user!.id, '', [], '');

    const secretKey = process.env.LOGIN_SECRET || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3
    });

    return token;
  }
}
