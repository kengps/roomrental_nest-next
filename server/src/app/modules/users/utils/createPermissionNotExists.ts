import { Permissions } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/config/prisma/prisma.service';

export const createPermissionsNotExist = async (
  prisma: PrismaService,
  permissions: { create: boolean; read: boolean; update: boolean; delete: boolean },
) => {

    const permissionsData = {
        create: permissions.create || false,
        read: permissions.read || true,
        update: permissions.update || false,
        delete: permissions.delete || false,
      };

      let existingPermissions = await prisma.permissions.findFirst({
        where: permissionsData,
      });

      if (!existingPermissions) {
        existingPermissions = await prisma.permissions.create({
          data: {
            id: nanoid(9),
            ...permissionsData,
            // data: permissionsData,
          },
        });
      }
      return existingPermissions
};
