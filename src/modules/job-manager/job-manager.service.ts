import { Injectable } from '@nestjs/common';
import { Message } from 'node-telegram-bot-api';
import { QueuesEnum } from './enum/queues.enum';
import { QueueProcessesEnum } from './enum/queue-processes.enum';

@Injectable()
export class JobManagerService {
  getNextProcessIfExists(message: Message, canRemoveProcess = false) {
    //
  }

  removeNextProcessIfExists(message: Message) {
    //
  }

  doProcess(
    message: Message,
    options?: {
      queue?: QueuesEnum;
      process?: QueueProcessesEnum;
    },
  ) {
    ///
  }

  createNewProcess(
    message: Message,
    data: Record<string, unknown>,
    options?: {
      queue?: QueuesEnum;
      process?: QueueProcessesEnum;
      ttl?: number;
    },
  ) {}
}