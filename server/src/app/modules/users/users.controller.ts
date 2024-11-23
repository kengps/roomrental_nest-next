import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

class BaseController {
  // find role
  @Get()
  findProfileInRole() {
    return this.findProfileInRole();
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data) {
    return this.usersService.create(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('password') password: string) {
    //@Body('password') => password : value || @Body() password : { password : value}
    return this.usersService.update(id, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

@Controller('roles')
export class RoleController extends BaseController {
  constructor(public usersService: UsersService) {
    super();
  }
  @Get()
  findProfileInRole() {
    return this.usersService.findProfileInRole();
  }
}
