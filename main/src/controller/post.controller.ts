import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Post } from '@/models/post.model';
import { IPostService } from '@/service/interface/i.post.service';
import { ITYPES } from '@/types/interface.types';
import c from 'config';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PostController {
  public common: IBaseCrudController<Post>;
  private postService: IPostService<Post>;
  constructor(
    @inject('PostService') postService: IPostService<Post>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Post>
  ) {
    this.postService = postService;
    this.common = common;
  }

  /**
   * * POST /api/posts/view/increase
   */
  async increaseViewPost(req: Request, res: Response, next: NextFunction) {
    try {
      //Get and lower case postId
      const postId = req.query.id?.toString().toLowerCase();
      const post = await this.postService.findOne({
        filter: {
          id: postId
        },
        select: {
          views: true
        }
      });

      if (!post) {
        return res.send_notFound('Post not found');
      }

      await this.postService.findOneAndUpdate({
        filter: {
          id: postId
        },
        updateData: {
          views: post.views + 1
        }
      });

      return res.send_ok('Increase view success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET api/posts/view
   */
  async getViewPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.query.id?.toString().toLowerCase();
      const post = await this.postService.findOne({
        filter: {
          id: postId
        },
        select: {
          views: true
        }
      });

      if (!post) {
        return res.send_notFound('Post not found');
      }

      return res.send_ok('Get view success', { view: post.views });
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/posts/detail
   */
  async getPostDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.query.id?.toString().toLowerCase();
      const post = await this.postService.findOne({
        filter: {
          id: postId
        }
      });
      return res.send_ok('Get post detail success', post);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/posts/recommend
   */

  async getRecommendPosts(req: Request, res: Response, next: NextFunction) {
    try {
      let sessionKey;

      console.log('req.headers', req.headers);

      if (req.headers['x-session-key']) {
        sessionKey = req.headers['x-session-key'].toString();
      }

      const topN = req.query.topN ? Number(req.query.topN) : 5;
      const posts = await this.postService.getRecommendPosts(topN, sessionKey);
      return res.send_ok('Get recommend posts success', posts);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/posts/many
   */
  async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      const posts: Post[] = req.body;
      for (const post of posts) {
        await this.postService.create({ data: post });
      }
      return res.send_ok('Create many posts success');
    } catch (error) {
      next(error);
    }
  }
}
