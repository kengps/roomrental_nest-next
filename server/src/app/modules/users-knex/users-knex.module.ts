import { Module } from '@nestjs/common';
import { UsersKnexService } from './users-knex.service';
import { UsersKnexController } from './users-knex.controller';

@Module({
  controllers: [UsersKnexController],
  providers: [UsersKnexService],
})
export class UsersKnexModule {}
