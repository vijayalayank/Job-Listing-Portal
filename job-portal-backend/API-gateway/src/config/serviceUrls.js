import dotenv from "dotenv";

dotenv.config();

export default {
    authService:process.env.AUTH_SERVICE_URL,
    jobService:process.env.JOB_SERVICE_URL,
    profileService:process.env.PROFILE_SERVICE_URL,
    applicationService:process.env.APPLICATION_SERVICE_URL,
};