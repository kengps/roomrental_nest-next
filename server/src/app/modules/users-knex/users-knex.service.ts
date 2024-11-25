import { Body, Injectable } from '@nestjs/common';
import { CreateUsersKnexDto } from './dto/create-users-knex.dto';
import { UpdateUsersKnexDto } from './dto/update-users-knex.dto';
import { db } from 'src/db';
import { usersTable } from 'src/db/schema';

@Injectable()
export class UsersKnexService {
  async create(data: { name: string; age: number; email: string }) {
    const users = {
      name: data.name,
      age: data.age,
      email: data.email,
    };
    const [newUser] = await db.insert(usersTable).values(users).$returningId();
    return newUser;
  }

  findAll() {
    return `This action returns all usersKnesdx`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersKnex`;
  }

  update(id: number, updateUsersKnexDto: UpdateUsersKnexDto) {
    return `This action updates a #${id} usersKnex`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersKnex`;
  }
}
