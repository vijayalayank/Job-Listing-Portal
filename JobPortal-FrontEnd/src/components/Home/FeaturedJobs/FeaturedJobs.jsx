import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios'; // Adjust path based on location
import styles from './FeaturedJobs.module.css';

const FeaturedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch latest 3 jobs for "featured" section
                const res = await api.get('/jobs');
                setJobs(res.data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch featured jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Helper to calculate days ago (simple version)
    const timeAgo = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
        return `${diffInDays} days ago`;
    };

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Featured Opportunities</h2>
                <p className={styles.subtitle}>Hand-picked positions from top companies</p>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading opportunities...</div>
            ) : (
                <div className={styles.grid}>
                    {jobs.map(job => (
                        <div key={job._id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>💼</div>
                                <div>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <p className={styles.companyName}>{job.company}</p>
                                </div>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.infoRow}>
                                    <span>📍 {job.location || 'Remote'}</span>
                                    <span className={styles.salary}>{job.salaryRange || '$Competitive'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>🕒 {job.type || 'Full-time'}</span>
                                    <span>⏱️ {timeAgo(job.postedAt)}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <Link to={`/jobs/${job._id}`} className={styles.applyBtn}>Apply Now</Link>
                                <Link to={`/jobs/${job._id}`} className={styles.viewBtn}>View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.viewAllContainer}>
                <Link to="/jobs" className={styles.viewAllLink}>View All Jobs →</Link>
            </div>
        </div>
    );
};

export default FeaturedJobs;
