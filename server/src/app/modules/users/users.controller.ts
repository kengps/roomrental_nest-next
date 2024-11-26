import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findByUsername(req.user.username);
  }

  @Get('parent')
  findUserParent() {
    return this.usersService.findUserParent();
  }
  @Get('isactive')
  findUserIsActive() {
    return this.usersService.findUserIsActive();
  }
  @Get('isnotactive')
  findUserIsNotActive() {
    return this.usersService.findUserIsNotActive();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body('password') password: string) {
    //@Body('password') => password : value || @Body() password : { password : value}
    return this.usersService.changePassword(id, password);
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
