const express = require('express');
const router = express.Router();
const { getSettings } = require('../controllers/settingsController');

router.get('/', getSettings);

module.exports = router;
