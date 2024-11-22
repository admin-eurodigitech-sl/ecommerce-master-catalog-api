import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMasterCatalog(): Promise<any> {
    return await this.appService.getMasterCatalog();
  }

  @Post("check-key")
  async isKeyInMasterCatalog(@Body() key: string): Promise<any> {
    return await this.appService.isKeyInMasterCatalog(key);
  }

  @Post()
  async addNewKey(@Body() key: string): Promise<any> {
    return await this.appService.addNewKey(key);
  }

  @Delete()
  async deleteKey(@Body() key: string): Promise<any> {
    return await this.appService.deleteKey(key);
  }
}