import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const { nanoid } = require('nanoid');
import { Prisma, Profile, RoleType } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { createRoleIfNotExists } from './utils/createRoleIfNotExists';
import { createPermissionsNotExist } from './utils/createPermissionNotExists';
import { createUsername, ensureUsernameUnique } from './utils/createUsername';
import { generateHashPassword } from 'src/shared/hashpassword';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    username: string;
    password: string;
    role: string;
    permissions: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    parentRoleId?: string;
  }): Promise<Profile> {
    const { username, password, role, permissions, parentRoleId } = data;
    try {
      const roleEnum = role as RoleType;

      //check username exist
      await ensureUsernameUnique(this.prisma, username);
      // Find the role

      //check permissions, exist return permissions !exist create permissions
      const roleData = await createRoleIfNotExists(this.prisma, roleEnum);

      //check role, exist return role !exist create role
      const existingPermissions = await createPermissionsNotExist(
        this.prisma,
        permissions,
      );

      //const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = await generateHashPassword(password);

      const dataUser = {
        username,
        password: hashedPassword,
        roleId: roleData.id,
        parentRoleId: parentRoleId || null,
        permissionsId: existingPermissions.id,
      };
      const newUser = createUsername(this.prisma, dataUser);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Profile[]> {
    return await this.prisma.profile.findMany();
  }

  findUserParent(id: string) {
    return `This action returns a #${id} user`;
  }

  async findProfileInRole() {
    return await this.prisma.role.findMany({
      include: {
        isProfiles: true,
      },
    });
  }
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, password: string): Promise<any> {
    console.log(`⩇⩇:⩇⩇🚨  file: users.service.ts:90  password :`, password);

    const existUser = await this.prisma.profile.findUnique({
      where: { id: id },
    });
    console.log(`⩇⩇:⩇⩇🚨  file: users.service.ts:94  existUser :`, existUser);

    if (!existUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashPassword = await generateHashPassword(password);
    // Hash the new password
    //   const hashPassword = await bcrypt.hash(password, 10);
    //   console.log(`⩇⩇:⩇⩇🚨  file: users.service.ts:103  hashPassword :`, hashPassword);

    const user = await this.prisma.profile.update({
      where: { id },
      data: { password: hashPassword },
    });

    return user;
  }

  async remove(id: string) {
    console.log(`⩇⩇:⩇⩇🚨  file: users.service.ts:115  id :`, id);
    await this.prisma.profile.findUnique({
      where: { id },
    });
    return `delete ${id} successfully`;
  }
}
