import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { JobManagerService } from '../job-manager/job-manager.service';
import { QueuesEnum } from '../job-manager/enum/queues.enum';
import { BotCommandsEnum } from './enums/botcommands.enum';
import { BotKeyboardMainEnum } from './enums/keyboards/bot.keyboard.main.enum';

@Injectable()
export class BotService implements OnModuleInit {
  bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });

  constructor(private readonly jobManagerService: JobManagerService) {}

  onModuleInit() {
    this.bot.on(
      'message',
      this.onReceivedMessageHandler.bind(this) as (
        message: TelegramBot.Message,
        metadata: TelegramBot.Metadata,
      ) => void,
    );
  }

  checkHasCorrectAccess(message: TelegramBot.Message) {
    if (message.chat.type !== 'private') {
      throw new Error('You have not correct access');
    }
  }

  private async onReceivedMessageHandler(
    message: TelegramBot.Message,
    metadata: TelegramBot.Metadata,
  ) {
    try {
      this.checkHasCorrectAccess(message);
    } catch {
      await this.bot.sendMessage(
        message.chat.id,
        'You have not correct access 🚫🤚',
      );
    }

    const nextProcessDetails =
      await this.jobManagerService.getNextProcessIfExists(message);

    this.getCommandAndDetailOfIt(message);

    return this.bot.sendMessage(message.chat.id, 'Saaalaaaaaam', {
      reply_markup: {
        keyboard: [
          [
            {
              text: BotKeyboardMainEnum.ShowServices,
            },
          ],
          [
            { text: BotKeyboardMainEnum.AboutUs },
            { text: BotKeyboardMainEnum.PrivacyPolicy },
          ],
        ],
      },
    });

    // return this.jobManagerService.doProcess(message, {
    //   queue: QueuesEnum.Entry,
    // });
  }

  getCommandAndDetailOfIt(message: TelegramBot.Message) {
    if (message?.entities) {
      if (message?.entities.length > 1) {
        throw new Error('Please enter just one command');
      }

      if (message.entities[0].offset > 0) {
        throw new Error(
          'Please enter the command from start of message editor box',
        );
      }

      for (const entity of message?.entities) {
        if (entity.type === 'bot_command') {
          const command = message.text.substring(
            entity.offset + 1,
            entity.offset + entity.length,
          );

          switch (command) {
            case BotCommandsEnum.Start: {
              break;
            }
            default: {
              throw new Error('Command not found');
            }
          }
        }
      }
    }
  }
}
