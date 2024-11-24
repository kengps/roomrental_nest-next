import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersKnexDto } from './create-users-knex.dto';

export class UpdateUsersKnexDto extends PartialType(CreateUsersKnexDto) {}
