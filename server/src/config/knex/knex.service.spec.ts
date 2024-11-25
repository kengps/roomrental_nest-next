import { Test, TestingModule } from '@nestjs/testing';

import { knexInstance } from 'knex/knex.config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class KnexService implements OnModuleInit, OnModuleDestroy {
  // ใช้ db ที่นำเข้ามาแล้ว ไม่ต้องสร้าง connection ใหม่
  async onModuleInit() {
    // ในที่นี้ไม่มีการเชื่อมต่อใหม่ เพราะ db ได้รับการตั้งค่าใน src/db แล้ว
    console.log('Knex ORM connected to MySQL');
  }

  // ใช้ lifecycle hook ของ NestJS ในการตัดการเชื่อมต่อฐานข้อมูล
  async onModuleDestroy() {}

  // ตัวอย่างการใช้ db เพื่อ query หรือทำงานกับฐานข้อมูล
}
