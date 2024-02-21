// logger.module.ts
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService], // Provide LoggerService
  exports: [LoggerService], // Export LoggerService to be used in other modules
})
export class LoggerModule {}