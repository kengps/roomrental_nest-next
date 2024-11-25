import {
  Module,
  OnApplicationBootstrap,
  Logger,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { jsonplaceholderModule } from '../jsonplaceholder/jsonplaceholder.module';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import mongoose from 'mongoose';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { PostsModule } from './modules/posts/posts.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersKnexModule } from './modules/users-knex/users-knex.module';
import { DrizzleModule } from 'src/config/drizzle/drizzle.module';
import { KnexModule } from 'src/config/knex/knex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('MongoDB');
        const uri = configService.get<string>('DATABASE_MONGO');

        // จับ Event ของ Mongoose

        mongoose.connection.on('connected', () => {
          logger.log(`Connected to MongoDB successfully!`);
        });

        mongoose.connection.on('error', (err) => {
          logger.error(`Failed to connect to MongoDB: ${err.message}`);
        });

        return { uri };
      },
      inject: [ConfigService],
    }),
    // ProductsModule,
    OrdersModule,
    jsonplaceholderModule,
    UsersModule,
    RoomsModule,
    // PostsModule,
    UsersKnexModule,

    //db connect
    PrismaModule,
    DrizzleModule,
    KnexModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes
  }
}
