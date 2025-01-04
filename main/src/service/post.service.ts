import { Post } from '@/models/post.model';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPostService } from '@/service/interface/i.post.service';
import redis from '@/utils/redis/redis.util';
import { inject, injectable } from 'inversify';

@injectable()
export class PostService extends BaseCrudService<Post> implements IPostService<Post> {
  private postRepository: IPostRepository<Post>;

  constructor(@inject('PostRepository') postRepository: IPostRepository<Post>) {
    super(postRepository);
    this.postRepository = postRepository;
  }

  async getRecommendPosts(topN: number, sessionKey?: string): Promise<Post[]> {
    //If have session key, get recommend posts by session key
    console.log('sessionKey', sessionKey);

    if (sessionKey) {
      const result = [];
      const recommendPostsRaw = await redis.get(`RECOMMEND:${sessionKey}`);

      if (recommendPostsRaw) {
        const recommendPosts = JSON.parse(recommendPostsRaw);

        let count = 0;
        for (const postId of recommendPosts) {
          if (count >= topN) {
            break;
          }
          count++;
          const post = await this.postRepository.findOne({
            filter: {
              id: postId.toLowerCase()
            }
          });

          if (post) {
            result.push(post);
          }
        }
        return result;
      }
    }

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
