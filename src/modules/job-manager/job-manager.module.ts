import { Global, Module } from '@nestjs/common';
import { JobManagerService } from './job-manager.service';
import { BullModule } from '@nestjs/bull';
import { QueuesEnum } from './enum/queues.enum';

@Global()
@Module({})
@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesEnum.Entry,
    }),
    BullModule.registerQueue({
      name: QueuesEnum.Authentication,
    }),
  ],
  providers: [JobManagerService],
  exports: [JobManagerService],
})
export class JobManagerModule {}
