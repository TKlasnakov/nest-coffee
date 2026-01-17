import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [],
})
export class CommonModule {}
