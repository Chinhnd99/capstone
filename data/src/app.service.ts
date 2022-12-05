import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];

  sayHi(): string {
    return 'Hello Udacity';
  }

  handleAccountCreated(data: CreateUserEvent) {
    console.log('handler User Created Udacity', data);
    this.analytics.push({
      email: data.email,
      password: data.password,
      name: data.name,
      age: data.age,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }
}
