const express = require('express');
const { createJob, getJobs, deleteJob, updateJob } = require('../controllers/job');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getJobs);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);


module.exports = router;
