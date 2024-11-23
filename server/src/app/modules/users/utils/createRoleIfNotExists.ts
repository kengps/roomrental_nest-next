import { BadRequestException } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/config/prisma/prisma.service';

export const createRoleIfNotExists = async (
  prisma: PrismaService,
  role: RoleType,
) => {
  const roleEnum = role as RoleType;

  if (!Object.values(RoleType).includes(roleEnum)) {
    throw new BadRequestException(`Invalid role provided: ${role}`);
  }

  let roleData = await prisma.role.findFirst({
    where: {
      name: roleEnum,
    },
  });

  // If the role does not exist, create a new role
  if (!roleData) {
    roleData = await prisma.role.create({
      data: {
        id: nanoid(7),
        name: roleEnum,
        isProfiles: {
          create: [],
        },
      },
    });
  }
  return roleData;
};

