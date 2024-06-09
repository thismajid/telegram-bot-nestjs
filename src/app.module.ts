import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { JobManagerModule } from './modules/job-manager/job-manager.module';

@Module({
  imports: [BotModule, JobManagerModule],
})
export class AppModule {}
