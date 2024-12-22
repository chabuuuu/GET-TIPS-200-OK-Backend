import { BaseRepository } from '@/repository/base/base.repository';
import { ISessionRepository } from '@/repository/interface/i.session.repository';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

@injectable()
export class SessionRepository implements ISessionRepository {
  constructor() {}
}
