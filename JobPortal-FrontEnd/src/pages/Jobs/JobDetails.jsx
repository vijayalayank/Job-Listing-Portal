import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useSession } from '../../context/SessionContext';
import styles from './JobDetails.module.css';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const { session, userid, role } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                setJob(res.data);
            } catch (error) {
                console.error("Failed to fetch job details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const [applying, setApplying] = useState(false);
    const [appData, setAppData] = useState({
        applicantName: '',
        applicantEmail: '',
        phone: '',
        resumeUrl: '',
        skills: '',
        experience: ''
    });

    const [resumeType, setResumeType] = useState('link'); // 'link' or 'file'
    const [resumeFile, setResumeFile] = useState(null);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('jobId', id);
            formData.append('applicantId', userid);
            formData.append('applicantName', appData.applicantName);
            formData.append('applicantEmail', appData.applicantEmail);
            formData.append('phone', appData.phone);
            formData.append('skills', appData.skills);
            formData.append('experience', appData.experience);

            if (resumeType === 'file') {
                if (!resumeFile) {
                    alert("Please select a file to upload.");
                    return;
                }
                formData.append('resumeFile', resumeFile);
            } else {
                if (!appData.resumeUrl) {
                    alert("Please enter a resume URL.");
                    return;
                }
                formData.append('resumeUrl', appData.resumeUrl);
            }

            await api.post('/applications', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Application submitted successfully!");
            setApplying(false);
        } catch (error) {
            console.error("Application failed", error);
            alert("Failed to apply. " + (error.response?.data?.message || ""));
        }
    };

    const handleChange = (e) => {
        setAppData({ ...appData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className={styles.loading}>Loading details...</div>;
    if (!job) return <div className={styles.error}>Job not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.iconBox}>💼</div>
                <div>
                    <h1 className={styles.title}>{job.title}</h1>
                    <p className={styles.company}>{job.company}</p>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.leftColumn}>
                    <div className={styles.card}>
                        <h3>Description</h3>
                        <p className={styles.description}>{job.description}</p>
                    </div>

                    <div className={styles.card}>
                        <h3>Requirements & Skills</h3>
                        <p className={styles.description}>No specific requirements listed.</p>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.card}>
                        <h3>Job Overview</h3>
                        <ul className={styles.metaList}>
                            <li><strong>Posted:</strong> {new Date(job.postedAt).toLocaleDateString()}</li>
                            <li><strong>Type:</strong> {job.type}</li>
                            <li><strong>Location:</strong> {job.location}</li>
                            <li><strong>Salary:</strong> {job.salaryRange || 'Not disclosed'}</li>
                        </ul>

                        {session && role === 'jobseeker' && !applying && (
                            <button onClick={() => setApplying(true)} className={styles.applyBtn}>Apply Now</button>
                        )}
                        {!session && (
                            <button onClick={() => navigate('/login')} className={styles.applyBtn}>Login to Apply</button>
                        )}
                    </div>
                </div>
            </div>

            {applying && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Apply for {job.title}</h3>
                        <form onSubmit={handleApply} className={styles.form}>
                            <input name="applicantName" placeholder="Full Name" value={appData.applicantName} onChange={handleChange} required className={styles.input} />
                            <input name="applicantEmail" placeholder="Email" type="email" value={appData.applicantEmail} onChange={handleChange} required className={styles.input} />
                            <input name="phone" placeholder="Phone Number" value={appData.phone} onChange={handleChange} className={styles.input} />
                            <input name="skills" placeholder="Skills (comma separated)" value={appData.skills} onChange={handleChange} className={styles.input} />
                            <input name="experience" placeholder="Experience" value={appData.experience} onChange={handleChange} className={styles.input} />

                            {/* Resume Section */}
                            <div className={styles.resumeSection}>
                                <div className={styles.toggleContainer}>
                                    <button
                                        type="button"
                                        className={`${styles.toggleBtn} ${resumeType === 'link' ? styles.active : ''}`}
                                        onClick={() => setResumeType('link')}>
                                        Resume Link
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.toggleBtn} ${resumeType === 'file' ? styles.active : ''}`}
                                        onClick={() => setResumeType('file')}>
                                        Upload File
                                    </button>
                                </div>

                                {resumeType === 'link' ? (
                                    <input name="resumeUrl" placeholder="Resume Link (Drive/Dropbox URL)" value={appData.resumeUrl} onChange={handleChange} className={styles.input} />
                                ) : (
                                    <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} className={styles.input} accept=".pdf,.doc,.docx" />
                                )}
                            </div>

                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.applyBtn}>Submit Application</button>
                                <button type="button" onClick={() => setApplying(false)} className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
