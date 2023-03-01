'use strict'
const path = require('path');
const sharp = require('sharp');
const gm = require('gm');

class NFTController {
  async get(req, res, next) {
    const { type, id } = req.params;
    let { width = 1080, height = 1080 } = req.query

    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }
    res.setHeader('Content-Type', 'image/png');
    if (type === 'avatar') {
      buildAvatar(width, height, res);
    } else {
      res.status(404).json({ error: 'File not found' })
    }

  }
}

function buildAvatar(width, height, res) {
  try {
    const folderPathAvatar = path.resolve(`resources/avatar/`); // path to folder

    const hairImageUrl = sharp(folderPathAvatar + '/mask.png'); // path to mask
    const bodyImageUrl = sharp(folderPathAvatar + '/avatar.png'); // path to orig img

    gm(hairImageUrl)
    .in('-fill', '#c600ff') // set color to change
    .in('-opaque', '#11df11') // set color for change
    .toBuffer((err, buff) => {
      bodyImageUrl
      .composite([{ input: buff, tile: true, blend: 'multiply' }])
      .toBuffer().then(cBuff => {
        sharp(cBuff).resize(+width, +height, {
          fit: 'contain',
          background: 'transparent'
        })

        .toBuffer().then((dBuff) => {
          res.send(dBuff)
        })
      })
    })
  } catch (error) {
    res.status(500).json({ error: 'Please try again' })
  }
}

module.exports = new NFTController()
