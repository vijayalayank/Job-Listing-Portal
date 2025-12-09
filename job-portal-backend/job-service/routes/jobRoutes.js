import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.type) filters.type = req.query.type;
        if (req.query.employerId) filters.employerId = req.query.employerId;
        if (req.query.location) filters.location = { $regex: req.query.location, $options: 'i' };
        if (req.query.search) {
            filters.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { company: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const jobs = await Job.find(filters).sort({ postedAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new job
router.post('/', async (req, res) => {
    const job = new Job(req.body);
    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(400).json({ message: error.message, error: error });
    }
});

// DELETE a job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
