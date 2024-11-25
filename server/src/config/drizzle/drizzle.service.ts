import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { db } from 'src/db'; // นำเข้า db จากไฟล์ src/db

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  
  // ใช้ db ที่นำเข้ามาแล้ว ไม่ต้องสร้าง connection ใหม่
  async onModuleInit() {
    // ในที่นี้ไม่มีการเชื่อมต่อใหม่ เพราะ db ได้รับการตั้งค่าใน src/db แล้ว
    console.log('Drizzle ORM connected to MySQL');
  }

  // ใช้ lifecycle hook ของ NestJS ในการตัดการเชื่อมต่อฐานข้อมูล
  async onModuleDestroy() {
    const connectionPool = db.$client; // Access the underlying MySQL connection pool from drizzle
    await connectionPool.end(); // Properly close the MySQL connection pool
    console.log('Drizzle ORM disconnected from MySQL');
  }

  // ตัวอย่างการใช้ db เพื่อ query หรือทำงานกับฐานข้อมูล
}
