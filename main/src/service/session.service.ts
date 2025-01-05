import { TrackingReq } from '@/dto/session/tracking.req';
import { TrackingDataDto } from '@/dto/tracking-data.dto';
import { ActionTypeEnum } from '@/enums/action-type.enum';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { ISessionRepository } from '@/repository/interface/i.session.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ISessionService } from '@/service/interface/i.session.service';
import redis from '@/utils/redis/redis.util';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class SessionService implements ISessionService {
  private sessionRepository: ISessionRepository;

  constructor(@inject('SessionRepository') sessionRepository: ISessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async tracking(sessionKey: string, trackingReq: TrackingReq): Promise<void> {
    let trackingData = new TrackingDataDto();

    trackingData = trackingReq as TrackingDataDto;

    trackingData.timestamp = new Date().toISOString();

    const trackingDataInRedis = await redis.get(`${RedisSchemaEnum.TRACKING}:${sessionKey}`);

    if (trackingDataInRedis) {
      const trackingDataList = JSON.parse(trackingDataInRedis) as TrackingDataDto[];

      trackingDataList.push(trackingData);

      await redis.set(
        `${RedisSchemaEnum.TRACKING}:${sessionKey}`,
        JSON.stringify(trackingDataList),
        'EX',
        60 * 60 * 24 * 30
      ); // 1 month
    } else {
      await redis.set(
        `${RedisSchemaEnum.TRACKING}:${sessionKey}`,
        JSON.stringify([trackingData]),
        'EX',
        60 * 60 * 24 * 30
      ); // 1 month
    }
  }

  async createSessionKey(oldSessionKey: string | undefined): Promise<string> {
    if (oldSessionKey) {
      const existsSessionKey = await redis.get(`${RedisSchemaEnum.SESSON_KEY}:${oldSessionKey}`);

      if (existsSessionKey) {
        return oldSessionKey;
      }
    }

    const newSessionKey = uuidv4();

    await redis.set(`${RedisSchemaEnum.SESSON_KEY}:${newSessionKey}`, newSessionKey, 'EX', 60 * 60 * 24 * 30); // 1 month

    return newSessionKey;
  }
}
