import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DrizzleController } from './drizzle.controller';

@Module({
  controllers: [DrizzleController],
  providers: [DrizzleService],
})
export class DrizzleModule {}
