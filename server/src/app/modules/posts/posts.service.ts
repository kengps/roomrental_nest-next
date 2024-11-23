import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Posts } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; description: string }): Promise<Posts> {
    try {
      const { title, description } = data;

      const exitsTitle = await this.prisma.posts.findUnique({
        where: {
          title,
        },
      });

      if (exitsTitle) {
         //throw new Error('Title already exists'); // ส่ง error หรือ handle ตามต้องกา
        throw new ConflictException('Title already exists!!');
      }
      return await this.prisma.posts.create({
        data: {
          title,
          description,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
