import { PostController } from '@/controller/post.controller';
import { PostService } from '@/service/post.service';
import { Post } from '@/models/post.model';
import { PostRepository } from '@/repository/post.repository';
import { IPostService } from '@/service/interface/i.post.service';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { BaseContainer } from '@/container/base.container';

class PostContainer extends BaseContainer {
  constructor() {
    super(Post);
    this.container.bind<IPostService<Post>>('PostService').to(PostService);
    this.container.bind<IPostRepository<Post>>('PostRepository').to(PostRepository);
    this.container.bind<PostController>(PostController).toSelf();
  }

  export() {
    const postController = this.container.get<PostController>(PostController);
    const postService = this.container.get<IPostService<any>>('PostService');
    const postRepository = this.container.get<IPostRepository<any>>('PostRepository');

    return { postController, postService, postRepository };
  }
}

const postContainer = new PostContainer();
const { postController, postService, postRepository } = postContainer.export();
export { postController, postService, postRepository };
