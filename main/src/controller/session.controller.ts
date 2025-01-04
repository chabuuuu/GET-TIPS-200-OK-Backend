import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { TrackingReq } from '@/dto/session/tracking.req';
import { ISessionService } from '@/service/interface/i.session.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class SessionController {
  private sessionService: ISessionService;
  constructor(@inject('SessionService') sessionService: ISessionService) {
    this.sessionService = sessionService;
  }

  /**
   * * GET /api/sessions/key
   */
  async getSessionKey(req: Request, res: Response, next: NextFunction) {
    try {
      let oldSessionKey;

      if (req.headers['x-session-key']) {
        oldSessionKey = req.headers['x-session-key'].toString();
      }

      const newSessionKey = await this.sessionService.createSessionKey(oldSessionKey);

      return res.send_ok('Session key created', { sessionKey: newSessionKey });
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/sessions/tracking
   */
  async tracking(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('hello');

      let sessionKey;

      if (req.headers['x-session-key']) {
        sessionKey = req.headers['x-session-key'].toString();
      } else {
        throw new BaseError('NOT_HAVE_SESSION_KEY', "You don't have session key");
      }

      const trackingReq: TrackingReq = req.body;

      trackingReq.post_id = trackingReq.post_id.toLowerCase();

      console.log('trackingReq', trackingReq);
      console.log('sessionKey');

      await this.sessionService.tracking(sessionKey, trackingReq);

      return res.send_ok('Tracking success');
    } catch (error) {
      next(error);
    }
  }
}
