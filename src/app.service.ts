import { Injectable } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class AppService {

  async getMasterCatalog(): Promise<any> {
    fs.readFile(process.env.MASTER_CATALOG_JSON_PATH, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading MASTER CATALOG DATA file from disk:", err)
            return
        }
        try {
            const json = JSON.parse(jsonString)
            console.log("Master Catalog Data: ", json);
            return json;

        } catch(err) {
            console.log('Error parsing MASTER CATALOG DATA JSON :', err)
        }
    })
  }

  async isKeyInMasterCatalog(key: string): Promise<any> {
    fs.readFile(process.env.MASTER_CATALOG_JSON_PATH, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading MASTER CATALOG DATA file from disk:", err)
            return
        }
        try {
            const json = JSON.parse(jsonString);
            return {
              isKeyInMasterCatalog: !!json[key],
              masterCatalog: json
            };

        } catch(err) {
            console.log('Error parsing MASTER CATALOG DATA JSON :', err)
        }
    })
  }

  async addNewKey(key: string): Promise<any> {

    const { isKeyInMasterCatalog, masterCatalog } = await this.isKeyInMasterCatalog(key);

    if (isKeyInMasterCatalog) {
      return `Key: ${key} already present in Master Catalog`;
    }

    const updatedMasterCatalog = {
      ...masterCatalog,
      [key]: key
    }

    return await this.replaceMasterCatalog(updatedMasterCatalog, `Key: ${key} added successfully`)
  }

  async replaceMasterCatalog(catalog: any, onSuccessString: string): Promise<any> {
    fs.writeFile(
      process.env.MASTER_CATALOG_JSON_PATH, 
      JSON.stringify(catalog),
      err => {
          if (err) {
              console.log("Error writing MASTER CATALOG DATA file to disk:", err)
              return
          }
          try {
              return onSuccessString;

          } catch(err) {
              console.log('Error parsing MASTER CATALOG DATA JSON :', err)
          }
      }
    );
  }


  async deleteKey(key: string): Promise<any> {

    const { isKeyInMasterCatalog, masterCatalog } = await this.isKeyInMasterCatalog(key);

    if (!isKeyInMasterCatalog) {
      return `Key: ${key} is not in master catalog`;
    }

    delete masterCatalog[key];

    return await this.replaceMasterCatalog(masterCatalog, `Key: ${key} was removed successfully`)
  }
}
