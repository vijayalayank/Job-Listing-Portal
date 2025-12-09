import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        required: true,
    },
    applicantName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    phone: { type: String },
    skills: { type: String },
    experience: { type: String },
    resumeUrl: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Applied', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'],
        default: 'Applied',
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
