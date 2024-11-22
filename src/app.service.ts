import { Injectable } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class AppService {

  async getMasterCatalog(): Promise<any> {
    fs.readFile('./master-catalog.json', 'utf8', (err, jsonString) => {
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
    fs.readFile('./master-catalog.json', 'utf8', (err, jsonString) => {
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

  

  async addNewKey(newKey: string): Promise<any> {

    const { isKeyInMasterCatalog, masterCatalog } = await this.isKeyInMasterCatalog(newKey);

    if (isKeyInMasterCatalog) {
      return `Key: ${newKey} already present in Master Catalog`;
    }

    const updatedMasterCatalog = {
      ...masterCatalog,
      [newKey]: newKey
    }

    fs.writeFile(
      "./master-catalog.json", 
      JSON.stringify(updatedMasterCatalog),
    );
  }
}
