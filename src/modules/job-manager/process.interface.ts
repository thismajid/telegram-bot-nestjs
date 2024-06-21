import { QueueProcessesEnum } from './enum/queue-processes.enum';
import { QueuesEnum } from './enum/queues.enum';

export interface IProcess {
  queue: QueuesEnum;
  process?: QueueProcessesEnum;
  data: Record<string, unknown>;
}
