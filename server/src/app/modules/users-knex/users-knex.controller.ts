import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersKnexService } from './users-knex.service';
import { CreateUsersKnexDto } from './dto/create-users-knex.dto';
import { UpdateUsersKnexDto } from './dto/update-users-knex.dto';

@Controller('users-knex')
export class UsersKnexController {
  constructor(private readonly usersKnexService: UsersKnexService) {}

  @Post()
  create(@Body() createUsersKnexDto: CreateUsersKnexDto) {
    return this.usersKnexService.create(createUsersKnexDto);
  }

  @Get()
  findAll() {
    return this.usersKnexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersKnexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersKnexDto: UpdateUsersKnexDto) {
    return this.usersKnexService.update(+id, updateUsersKnexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersKnexService.remove(+id);
  }
}
