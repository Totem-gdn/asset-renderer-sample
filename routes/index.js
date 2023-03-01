const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

/* GET home page. */
router.get('/:id', controllers.api.nft.get);

module.exports = router;
