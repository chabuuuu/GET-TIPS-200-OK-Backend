import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IUserService<T extends BaseModelType> extends IBaseCrudService<T> {
  login(username: any, password: any): Promise<string>;
}
