'use strict'
// We are importing the library for parsing JSON + hash to object.
const { DNAParser, ContractHandler } = require('totem-dna-parser');
// We are importing the static JSON files with filters.
const totemCommonFiles = require('totem-common-files')

class NFT {
  constructor() {
    this.ApiURL = process.env.API_URL;
    // We are building an object for different types of assets.
    this.Contracts = {
      avatar: process.env.AVATAR_CONTRACT,
      item: process.env.ITEM_CONTRACT,
      gem: process.env.GEM_CONTRACT
    }
  }
  // This is the main function where we create an object from the JSON filter.
  // We pass the type and ID to this function.
  async get (type, id) {
    try {
      // We select which filter to take, whether it's for an avatar or an item.
      let filterJson = type === 'avatar' ? totemCommonFiles.avatarFilterJson : totemCommonFiles.itemFilterJson;
      const contractHandler = new ContractHandler(this.ApiURL, this.Contracts[type]);
      // The asset hash is retrieved by ID.
      const dna = await contractHandler.getDNA(id);
      // We create a DNAParser object and pass it the filter and hash.
      const parser = new DNAParser(filterJson, dna);
      
      // We extract all the properties that are in the given filter.
      const properties = parser.getFilterPropertiesList();

      const jsonProp = {...properties};
      const settings = {};
      // We loop through all the properties that are in the filter, and using the getField function, we extract the value by the property name and write it to our object.
      for (const key in properties) {
        if (Object.hasOwnProperty.call(properties, key)) {
          settings[jsonProp[key]] = parser.getField(properties[key]);
        }
      }
      // We return the final object that we assembled with property names and their values.
      return settings;
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new NFT()