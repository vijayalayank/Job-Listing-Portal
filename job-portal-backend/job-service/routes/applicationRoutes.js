import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// POST apply for a job
router.post('/', async (req, res) => {
    const application = new Application(req.body);
    try {
        const newApplication = await application.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET applications for a specific job (Employer view)
router.get('/job/:jobId', async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET applications by an applicant (Seeker view)
router.get('/applicant/:applicantId', async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.params.applicantId }).populate('jobId');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
