import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'node-telegram-bot-api';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Cache } from 'cache-manager';
import { Queue } from 'bull';

import { QueuesEnum } from './enum/queues.enum';
import { QueueProcessesEnum } from './enum/queue-processes.enum';
import { IProcess } from './process.interface';

@Injectable()
export class JobManagerService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue(QueuesEnum.Entry) private readonly entryQueue: Queue,
  ) {}

  async getNextProcessIfExists(message: Message, canRemoveProcess = false) {
    const result = await this.cacheManager.get<IProcess>(
      `account-process-${message.from.id}`,
    );

    if (canRemoveProcess) {
      await this.removeNextProcessIfExists(message);
    }

    return result;
  }

  async removeNextProcessIfExists(message: Message) {
    await this.cacheManager.del(`account-process-${message.from.id}`);
  }

  doProcess(
    message: Message,
    options?: {
      queue?: QueuesEnum;
      process?: QueueProcessesEnum;
    },
  ) {
    const queue = options?.queue || QueuesEnum.Entry;
    const process = options.process;

    switch (queue) {
      case QueuesEnum.Entry: {
        if (options?.process) this.entryQueue.add(process, { message });
        else this.entryQueue.add({ message });

        break;
      }
    }
  }

  async createNextProcess(
    message: Message,
    data: Record<string, unknown>,
    options?: {
      queue?: QueuesEnum;
      process?: QueueProcessesEnum;
      ttl?: number;
    },
  ) {
    await this.cacheManager.set(
      `account-process-${message.from.id}`,
      {
        data,
        queue: options?.queue || QueuesEnum.Entry,
        process: options?.process,
      } as {
        queue: QueuesEnum;
        process?: QueueProcessesEnum;
        data: Record<string, unknown>;
      },
      options?.ttl || 300_000,
    );
  }
}
