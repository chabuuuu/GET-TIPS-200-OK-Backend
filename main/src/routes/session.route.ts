import { sessionController } from '@/container/session.container';
import { TrackingReq } from '@/dto/session/tracking.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const sessionRouter = express.Router();

sessionRouter

  .post('/tracking', classValidate(TrackingReq), sessionController.tracking.bind(sessionController))

  .get('/key', sessionController.getSessionKey.bind(sessionController));

export default sessionRouter;
