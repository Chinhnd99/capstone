import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  testService(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'account_created',
      new CreateUserEvent(
        createUserRequest.email,
        createUserRequest?.name,
        createUserRequest?.password,
        createUserRequest?.age,
      ),
    );
    this.analyticsClient.emit(
      'account_created',
      new CreateUserEvent(
        createUserRequest.email,
        createUserRequest?.name,
        createUserRequest?.password,
        createUserRequest?.age,
      ),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
