import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const { nanoid } = require('nanoid');
import { Prisma, Profile, Role, RoleType } from '@prisma/client';

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

  async findByUsername(username: string): Promise<any> {
   
   const user = await this.prisma.profile.findUnique({
      where: { username: username },
    });
    

    return user
  }
  
  
  async findUserParent(): Promise<Profile[]> {
    const userParent = await this.prisma.profile.findMany({
      where: {
        parentRoleId: {
          not: null, // เงื่อนไขว่าต้องไม่เป็น null
        },
      },
    });
    return userParent;
  }

  async findUserIsActive(): Promise<Profile[]> {
    const userParent = await this.prisma.profile.findMany({
      where: {
        isActive: true,
      },
    });
    return userParent;
  }

  async findUserIsNotActive(): Promise<Profile[]> {
    const userParent = await this.prisma.profile.findMany({
      where: {
        isActive: false,
      },
    });
    return userParent;
  }

  async findProfileInRole(): Promise<Role[]> {
    return await this.prisma.role.findMany({
      include: {
        isProfiles: true,
      },
    });
  }
  async findOne(id: string): Promise<Profile | null> {
    const user = await this.prisma.profile.findUnique({
      where: { id: id },
    });
    return user;
  }

  async changePassword(id: string, password: string): Promise<Profile | null> {
    const existUser = await this.prisma.profile.findUnique({
      where: { id: id },
    });

    if (!existUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashPassword = await generateHashPassword(password);

    const user = await this.prisma.profile.update({
      where: { id },
      data: { password: hashPassword },
    });

    return user;
  }

  async remove(id: string): Promise<string> {
    await this.prisma.profile.delete({
      where: { id },
    });
    return `delete ${id} successfully`;
  }
}
