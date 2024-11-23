import { HttpService } from '@nestjs/axios';
import { Injectable, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonplaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<any> {

    const response = await firstValueFrom(
      this.httpService.get(process.env.JSONPLACEHOLDER_URL),
    );
    return response.data;
  }
}
