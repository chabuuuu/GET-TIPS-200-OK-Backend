import { TrackingReq } from '@/dto/session/tracking.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ISessionService {
  tracking(sessionKey: string, trackingReq: TrackingReq): Promise<void>;
  createSessionKey(oldSessionKey: string | undefined): Promise<string>;
}
