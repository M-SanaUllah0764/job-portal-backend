const express = require('express');
const { createJob, getJobs, deleteJob, updateJob } = require('../controllers/job');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getJobs);
router.post('/', auth, createJob);
router.delete('/:id', auth, deleteJob);
router.put('/:id', auth, updateJob);


module.exports = router;
