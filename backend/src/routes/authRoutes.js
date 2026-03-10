const express = require('express');
const router = express.Router();
const { loginUser, registerBusiness, registerSuperAdmin } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register-business', registerBusiness);
// IMPORTANT: This route should ideally be secure or removed once the superadmin is created.
router.post('/register-superadmin', registerSuperAdmin);

module.exports = router;
