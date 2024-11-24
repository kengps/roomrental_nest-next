import { Global, Module } from '@nestjs/common';
import { KnexjsService } from './knexjs.service';
import { KnexjsController } from './knexjs.controller';

@Global()
@Module({
  controllers: [KnexjsController],
  providers: [KnexjsService],
})
export class KnexjsModule {}
