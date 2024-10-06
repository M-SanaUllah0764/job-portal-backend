// controllers/job.js
const Job = require('../models/Job');

// Create a Job
exports.createJob = async (req, res) => {
    const { title, description } = req.body;

    try {
        const job = new Job({
            title,
            description,
            createdBy: req.user.id,
        });

        await job.save();
        // Corrected this line to send the response only once
        res.status(201).json({ message: 'New job created successfully', job });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Update a Job
exports.updateJob = async (req, res) => {
    const jobId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, description },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job updated successfully', job: updatedJob });
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Delete a Job
exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Use findByIdAndDelete to remove the job
        await Job.findByIdAndDelete(jobId);
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error during job deletion:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
