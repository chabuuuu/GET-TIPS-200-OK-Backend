import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IPostService<T extends BaseModelType> extends IBaseCrudService<T> {
  getRecommendPosts(topN: number): Promise<T[]>;
}
