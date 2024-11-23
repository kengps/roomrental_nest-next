import { ConflictException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/config/prisma/prisma.service';

type userData = {
  username: string;
  password: string;
  roleId: string;
  parentRoleId: string | null;
  permissionsId: string;
};
export async function createUsername(prisma: PrismaService, data: userData) {
  const newUser = await prisma.profile.create({
    data: {
      id: nanoid(27),
      ...data, // TODO เอาข้อมูลจาก data มาทั้งหมด
    },
  });
  return newUser;
}



export async function ensureUsernameUnique(prisma: PrismaService,username: string) {
    const existingUser = await prisma.profile.findUnique({
        where: {
          username: username,
        },
      });
      if (existingUser) {
        throw new ConflictException('Username already exists!!');
      }
  }
  
  
  
  