import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit {
  bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });

  onModuleInit() {
    this.bot.on(
      'message',
      this.onReceiveMessageHandler.bind(this) as (
        message: TelegramBot.Message,
        metadata: TelegramBot.Metadata,
      ) => void,
    );
  }

  private onReceiveMessageHandler(
    message: TelegramBot.Message,
    metadata: TelegramBot.Metadata,
  ) {}
}
