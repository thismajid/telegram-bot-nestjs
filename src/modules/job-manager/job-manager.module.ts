import { Global, Module } from '@nestjs/common';
import { JobManagerService } from './job-manager.service';

@Global()
@Module({})
export class JobManagerModule {
  providers: [JobManagerService];
  exports: [JobManagerService];
}
