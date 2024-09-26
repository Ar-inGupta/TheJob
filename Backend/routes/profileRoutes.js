const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to protect routes
router.use(authMiddleware);

router.put('/update', updateProfile);

module.exports = router;
