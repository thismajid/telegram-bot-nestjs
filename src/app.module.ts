import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { JobManagerModule } from './modules/job-manager/job-manager.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BotModule, JobManagerModule],
})
export class AppModule {}
