import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import styles from './Jobs.module.css';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (type) params.type = type;
            if (location) params.location = location;

            const res = await api.get('/jobs', { params });
            setJobs(res.data);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleValues = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    // Helper for "time ago"
    const timeAgo = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1d ago';
        return `${diffInDays}d ago`;
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.headerSection}>
                <h1>Find Your Next Opportunity</h1>
                <p>Browse thousands of active job listings from top companies.</p>
            </div>

            <div className={styles.jobListingContainer}>
                {/* Search Filter Bar */}
                <form className={styles.filterBar} onSubmit={handleValues}>
                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search by title, skill, or company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>📍</span>
                        <input
                            type="text"
                            placeholder="Location (e.g. New York)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className={styles.selectGroup}>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">All Job Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.searchBtn}>Search Jobs</button>
                </form>

                {/* Job List */}
                <div className={styles.jobList}>
                    {loading ? (
                        <div className={styles.loading}>Loading opportunities...</div>
                    ) : jobs.length === 0 ? (
                        <div className={styles.emptyState}>
                            <h3>No jobs found matching your criteria</h3>
                            <p>Try adjusting your search terms or filters.</p>
                            <button onClick={() => { setSearch(''); setLocation(''); setType(''); fetchJobs(); }} className={styles.resetBtn}>Clear Filters</button>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <Link to={`/jobs/${job._id}`} key={job._id} className={styles.jobCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.logoPlaceholder}>💼</div>
                                    <div>
                                        <h3>{job.title}</h3>
                                        <p className={styles.company}>{job.company}</p>
                                    </div>
                                </div>

                                <div className={styles.cardTags}>
                                    <span className={styles.tag}>{job.type}</span>
                                    <span className={styles.tag}>{job.location || 'Remote'}</span>
                                </div>

                                <div className={styles.cardFooter}>
                                    <span className={styles.salary}>{job.salaryRange || 'Competitive'}</span>
                                    <span className={styles.date}>{timeAgo(job.postedAt)}</span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobListing;
