import { SessionController } from '@/controller/session.controller';
import { SessionService } from '@/service/session.service';
import { SessionRepository } from '@/repository/session.repository';
import { ISessionService } from '@/service/interface/i.session.service';
import { ISessionRepository } from '@/repository/interface/i.session.repository';
import { Container } from 'inversify';

class SessionContainer {
  private container = new Container();
  constructor() {
    this.container.bind<ISessionService>('SessionService').to(SessionService);
    this.container.bind<ISessionRepository>('SessionRepository').to(SessionRepository);
    this.container.bind<SessionController>(SessionController).toSelf();
  }

  export() {
    const sessionController = this.container.get<SessionController>(SessionController);
    const sessionService = this.container.get<ISessionService>('SessionService');
    const sessionRepository = this.container.get<ISessionRepository>('SessionRepository');

    return { sessionController, sessionService, sessionRepository };
  }
}

const sessionContainer = new SessionContainer();
const { sessionController, sessionService, sessionRepository } = sessionContainer.export();
export { sessionController, sessionService, sessionRepository };
