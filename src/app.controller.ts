import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("master-catalog-api")
  async getMasterCatalog(): Promise<any> {
    return await this.appService.getMasterCatalog();
  }

  @Post("master-catalog-api/check-key")
  async isKeyInMasterCatalog(key: string): Promise<any> {
    return await this.appService.isKeyInMasterCatalog(key);
  }

  @Post("master-catalog-api")
  async addNewKey(newKey: string): Promise<any> {
    return await this.appService.addNewKey(newKey);
  }
}
