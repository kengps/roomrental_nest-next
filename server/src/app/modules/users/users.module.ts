import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {  RoleController, UsersController } from './users.controller';
import { PrismaService } from 'src/config/prisma/prisma.service';


@Module({
  controllers: [UsersController ,RoleController ],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
