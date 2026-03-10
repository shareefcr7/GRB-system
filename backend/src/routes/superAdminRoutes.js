const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { 
  getAllBusinesses, addBusiness, updateBusiness, deleteBusiness, renewSubscription,
  getAdmins, addAdmin, updateAdmin, deleteAdmin, 
  getDashboardStats 
} = require('../controllers/superAdminController');

// All routes require SuperAdmin role
router.use(protect, admin);

router.route('/dashboard-stats')
  .get(getDashboardStats);

router.route('/businesses')
  .get(getAllBusinesses)
  .post(addBusiness);

router.route('/businesses/:id')
  .put(updateBusiness)
  .delete(deleteBusiness);

router.post('/businesses/:id/renew', renewSubscription);

router.route('/admins')
  .get(getAdmins)
  .post(addAdmin);

router.route('/admins/:id')
  .put(updateAdmin)
  .delete(deleteAdmin);

module.exports = router;
