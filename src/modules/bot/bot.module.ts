import { Module } from '@nestjs/common';
import { BotService } from './bot.service';

@Module({})
export class BotModule {
  providers: [BotService];
}
