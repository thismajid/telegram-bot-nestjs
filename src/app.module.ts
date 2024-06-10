import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { JobManagerModule } from './modules/job-manager/job-manager.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { configLoader } from './config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configLoader],
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get('database.redis'),
      }),
    }),
    BotModule,
    JobManagerModule,
  ],
})
export class AppModule {}
