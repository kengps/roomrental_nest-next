import { Module } from '@nestjs/common';
import { JsonplaceholderController } from './jsonplaceholder.controller';
import { JsonplaceholderService } from './jsonplaceholder.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [JsonplaceholderController],
  providers: [JsonplaceholderService],
})
export class jsonplaceholderModule {}
