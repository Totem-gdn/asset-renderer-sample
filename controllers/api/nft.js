'use strict'
const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs')

class NFTController {
  async get(req, res, next) {
    const { type, id } = req.params
    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }

    try {
      const folderPath = path.resolve(`resources/${type}/`)
      const files = await readdir(folderPath);
      console.log('id % 12', id % 12);
      const filename = files.find((f) => f.startsWith(`${id % 12}.`));
      const filePath = path.resolve(`resources/${type}/${filename}`);
      console.log('filePath', filePath);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath)
      } else {
        res.status(404).json({ error: 'File not found' })
      }
    } catch (error) {
      res.status(404).json({ error })
    }

  }
}

module.exports = new NFTController()
