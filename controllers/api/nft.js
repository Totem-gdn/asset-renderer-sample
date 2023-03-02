'use strict'
const nftHelper = require('../../helpers/dna-parser');
const sharp = require('sharp');

class NFTController {
  // This is the function for building the asset for the item.
  async getItem(req, res, next) {
    // We extract the asset ID from the URL parameters.
    const { id } = req.params;
    // We extract the height and width from the URL, if they were passed.
    // By default, we set them to 400 pixels.
    let { width = 400, height = 400 } = req.query;

    // If we don't have an ID in the parameters, we throw an error.
    if (!id) {
      res.status(404).json({ error: 'Wrong url' })
    }

    // We use the file to build an object with parameters.
    // helpers/dna-parser.js
    // We pass the asset type and ID to the function.
    const nft = await nftHelper.get('item', id);
    // In the console logs, we can see what object we have.
    console.log('nft', nft);
    // In the default filter, it has the following parameters.
    // by url http://localhost:3000/item/210?width=500&height=500
    // nft {
    //   primary_color: 'rgb(197,228,255)',
    //   secondary_color: 'rgb(188,7,147)',
    //   classical_element: 'Air',
    //   damage_nd: 15758919,
    //   range_nd: 2521842692,
    //   power_nd: 1525241365,
    //   magical_exp: 35184,
    //   weapon_material: 'Bone'
    // }

    // This tells our browser that we are returning an image.
    res.setHeader('Content-Type', 'image/png');
    // We then build our image using:
    // The object with parameters
    // The width
    // The height
    // And we pass it the response object to send the final result.
    buildItem(nft, +width, +height, res);
  }

  // This is the function for building the asset for the avatar.
  async getAvatar(req, res, next) {
    const { id } = req.params;
    let { width = 400, height = 400 } = req.query;

    if (!id) {
      res.status(404).json({ error: 'Wrong format' })
    }
    // get params for render avatar by id
    const nft = await nftHelper.get('avatar', id);
    console.log('nft', nft);
    res.setHeader('Content-Type', 'image/png');
    buildAvatar(nft, +width, +height, res);
  }

}

function buildItem(nft, width, height, res) {
  // In this function, we create a try-catch block.
  // This is so that if there is an error when building the asset, we can handle it.
  try {
    // We create variables that we will use for our asset.
    const backgroundColor = nft.primary_color;
    const textColor = nft.secondary_color;
    const fontSize = 20;
    const number = nft.classical_element + '_' + nft.weapon_material;
    // Using Sharp, we create a figure with the height, width, and background color passed as parameters.
    sharp({
      create: {
        width,
        height,
        channels: 4,
        background: backgroundColor
      }
    })
    // Using Composite, we can combine two elements.
    // In this case, we combine the figure with text (using SVG syntax), and we center the text using gravity.
      .composite([{
        input: Buffer.from(`<svg><text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-size="${fontSize}" fill="${textColor}">${number}</text></svg>`),
        gravity: 'center'
      }])
      // Then, we convert the combined figure with text to PNG.
      .png()
      // Finally, we send the result to the client.
      .pipe(res);

  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error })
  }
}

function buildAvatar(nft, width, height, res) {
  try {

    const backgroundColor = nft.primary_color;
    const textColor = nft.secondary_color;
    const fontSize = 20;
    const text = nft.sex_bio + '_' + nft.hair_styles;

    sharp({
      create: {
        width,
        height,
        channels: 4,
        background: backgroundColor
      }
    })
      .composite([{
        input: Buffer.from(`<svg><text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-size="${fontSize}" fill="${textColor}">${text}</text></svg>`),
        gravity: 'center'
      }])
      .png()
      .pipe(res);
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = new NFTController()
