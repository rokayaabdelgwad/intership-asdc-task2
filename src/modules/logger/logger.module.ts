import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        const logDirectory = 'D:\\Projects\\intership asdc\\intership-asdc-task2\\src\\modules\\logger\\error'; 
        return new LoggerService(logDirectory);
      },
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
