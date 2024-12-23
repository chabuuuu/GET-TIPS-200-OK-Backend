import { userController } from '@/container/user.container';
import express from 'express';
const userRouter = express.Router();

userRouter.post('/login', userController.login.bind(userController));

export default userRouter;
