import express from 'express';
import multer from 'multer';
import path from 'path';
import Application from '../models/Application.js';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST apply for a job
router.post('/', upload.single('resumeFile'), async (req, res) => {
    try {
        const applicationData = req.body;

        // Handle file upload
        if (req.file) {
            // Store the path accessible via the static route
            applicationData.resumeUrl = `/api/jobs/uploads/${req.file.filename}`;
        } else if (!applicationData.resumeUrl) {
            return res.status(400).json({ message: "Resume is required (File or Link)" });
        }

        const application = new Application(applicationData);
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
