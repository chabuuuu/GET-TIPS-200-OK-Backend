import { UserController } from '@/controller/user.controller';
import { UserService } from '@/service/user.service';
import { User } from '@/models/user.model';
import { UserRepository } from '@/repository/user.repository';
import { IUserService } from '@/service/interface/i.user.service';
import { IUserRepository } from '@/repository/interface/i.user.repository';
import { BaseContainer } from '@/container/base.container';

class UserContainer extends BaseContainer {
  constructor() {
    super(User);
    this.container.bind<IUserService<User>>('UserService').to(UserService);
    this.container.bind<IUserRepository<User>>('UserRepository').to(UserRepository);
    this.container.bind<UserController>(UserController).toSelf();
  }

  export() {
    const userController = this.container.get<UserController>(UserController);
    const userService = this.container.get<IUserService<any>>('UserService');
    const userRepository = this.container.get<IUserRepository<any>>('UserRepository');

    return { userController, userService, userRepository };
  }
}

const userContainer = new UserContainer();
const { userController, userService, userRepository } = userContainer.export();
export { userController, userService, userRepository };
