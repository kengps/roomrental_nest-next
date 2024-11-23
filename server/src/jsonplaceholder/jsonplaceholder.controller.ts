import { JsonplaceholderService } from './jsonplaceholder.service';
import { Controller, Get } from '@nestjs/common';

@Controller('jsonplaceholders')
export class JsonplaceholderController {
  constructor(
    private readonly jsonplaceholderService: JsonplaceholderService,
  ) {}

  @Get()
  async getAllPosts(): Promise<any> {
        return this.jsonplaceholderService.getAll()
  }
}
