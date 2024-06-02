const express = require('express');
const router = express.Router();
const dataFetch = require('../controller/dataController');

// Get all data
router.route('/data').get(dataFetch);

module.exports = router;
