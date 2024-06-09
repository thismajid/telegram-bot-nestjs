import { Module } from '@nestjs/common';
import { JobManagerService } from './job-manager.service';

@Module({})
export class JobManagerModule {
  providers: [JobManagerService];
}
