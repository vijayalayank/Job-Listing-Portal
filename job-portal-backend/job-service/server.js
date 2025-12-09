import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));
app.use(morgan('dev'));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
// Serve uploaded resumes statically under /api/jobs/uploads to match Gateway routing
app.use('/api/jobs/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Job Service is running');
});

// Database Connection
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-portal';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Job Service Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Job Service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
