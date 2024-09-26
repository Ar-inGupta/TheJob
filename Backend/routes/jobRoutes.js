const express = require('express');
const router = express.Router();
const { postJob, searchJobs, applyForJob, matchJobs, getJobs } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
const jobMiddleware = require('../middlewares/jobMiddleware');

// Middleware to protect routes

router.post('/post',jobMiddleware,postJob); // Employer only
router.get('/search',authMiddleware, searchJobs); // Public route
router.post('/apply',authMiddleware, applyForJob); // Job-seeker only
router.get('/match',authMiddleware,matchJobs);
router.get('/all',authMiddleware,getJobs);
module.exports = router;

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZTRhOGNjNTEzZWMyYTQ3OGI3OGUwIiwicm9sZSI6ImVtcGxveWVyIn0sImlhdCI6MTcyMTY0OTg4NiwiZXhwIjoxNzIxNjUzNDg2fQ.6tnceV4MpdnJN56_KeV1GCiGUAUdNLDpP05LgtnpQFI"
// }