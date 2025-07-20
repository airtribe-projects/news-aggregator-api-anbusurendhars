const express = require('express');
const router = express.Router();

const { getPreferredNewsController } = require('../controller/news-controller');
const { isUserAuthenticated } = require('../middleware/authentication');

router.get('/', isUserAuthenticated, getPreferredNewsController);

module.exports = router