import { postController } from '@/container/post.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';
const postRouter = express.Router();

postRouter

  .delete('/:id', authenticateJWT, postController.common.delete.bind(postController.common))

  .put('/:id', authenticateJWT, postController.common.update.bind(postController.common))

  .post('/many', authenticateJWT, postController.createMany.bind(postController))

  .post('/view/increase', postController.increaseViewPost.bind(postController))

  .post('/', authenticateJWT, postController.common.create.bind(postController.common))

  .get('/recommend', postController.getRecommendPosts.bind(postController))

  .get('/view', postController.getViewPost.bind(postController))

  .get('/detail', postController.getPostDetail.bind(postController))

  .get('/', postController.common.findWithPaging.bind(postController.common));

export default postRouter;
