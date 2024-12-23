import { Post } from '@/models/post.model';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPostService } from '@/service/interface/i.post.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PostService extends BaseCrudService<Post> implements IPostService<Post> {
  private postRepository: IPostRepository<Post>;

  constructor(@inject('PostRepository') postRepository: IPostRepository<Post>) {
    super(postRepository);
    this.postRepository = postRepository;
  }

  async getRecommendPosts(topN: number): Promise<Post[]> {
    return this.postRepository.findMany({
      paging: {
        page: 1,
        rpp: topN
      },
      order: [
        {
          column: 'views',
          direction: 'DESC'
        }
      ]
    });
  }
}
