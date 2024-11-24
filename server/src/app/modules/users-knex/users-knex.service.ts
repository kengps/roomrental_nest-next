import { Injectable } from '@nestjs/common';
import { CreateUsersKnexDto } from './dto/create-users-knex.dto';
import { UpdateUsersKnexDto } from './dto/update-users-knex.dto';



@Injectable()
export class UsersKnexService {
 
  async create(userData:any){
    console.log(userData);
    
    return 'This action adds a new usersKnexดหกดหกหก';
  }

  findAll() {
    return `This action returns all usersKnexกดหกดห`;
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
