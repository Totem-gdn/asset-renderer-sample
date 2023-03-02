const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

/* We have two routes, one for item and one for avatar. For each of them, there is a separate function that builds the asset. */
router.get('/item/:id', controllers.api.nft.getItem);
router.get('/avatar/:id', controllers.api.nft.getAvatar);

module.exports = router;
