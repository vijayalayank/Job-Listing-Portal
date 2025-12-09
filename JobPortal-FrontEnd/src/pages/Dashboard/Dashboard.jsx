import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useSession } from '../../context/SessionContext';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { session, role, userid } = useSession();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        const fetchData = async () => {
            try {
                let res;
                if (role === 'employer') {
                    res = await api.get(`/jobs?employerId=${userid}`);
                } else {
                    // Seeker: fetch applications
                    res = await api.get(`/applications/applicant/${userid}`);
                }
                setItems(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [session, role, userid]);

    if (!session) return <p className={styles.noData}>Please log in.</p>;

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await api.delete(`/jobs/${jobId}`);
            setItems(items.filter(item => item._id !== jobId));
        } catch (error) {
            console.error("Failed to delete job", error);
            alert("Failed to delete job");
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.sectionTitle}>Dashboard - {role === 'employer' ? 'Employer' : 'Job Seeker'}</h2>

            {loading ? <p>Loading...</p> : (
                <div className={styles.dashboardContent}>
                    {role === 'jobseeker' ? (
                        <div>
                            <h3 className={styles.subTitle}>Applied Jobs</h3>
                            {!Array.isArray(items) || items.length === 0 ? <p className={styles.noData}>No applications yet.</p> : (
                                <ul className={styles.list}>
                                    {items.map(app => (
                                        <li key={app._id} className={styles.listItem}>
                                            <strong>Job:</strong> <Link to={`/jobs/${app.jobId?._id}`}>{app.jobId?.title || 'Unknown Job'}</Link> <br />
                                            <strong>Status:</strong> {app.status} <br />
                                            <strong>Applied:</strong> {new Date(app.appliedAt).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h3 className={styles.subTitle}>Your Posted Jobs</h3>
                            <Link to="/post-job" className={styles.postJobBtn}>Post a New Job</Link>

                            {!Array.isArray(items) || items.length === 0 ? <p className={styles.noData}>You haven't posted any jobs yet.</p> : (
                                <div className={styles.jobCardStack}>
                                    {items.map(job => (
                                        <EmployerJobCard key={job._id} job={job} onDelete={handleDelete} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Subcomponent to handle fetching applicants for a single job
const EmployerJobCard = ({ job, onDelete }) => {
    const [showApplicants, setShowApplicants] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleApplicants = async () => {
        if (!showApplicants && applicants.length === 0) {
            setLoading(true);
            try {
                const res = await api.get(`/applications/job/${job._id}`);
                setApplicants(res.data);
            } catch (e) {
                console.error("Failed to fetch applicants", e);
            } finally {
                setLoading(false);
            }
        }
        setShowApplicants(!showApplicants);
    }

    return (
        <div className={styles.employerJobCard}>
            <div className={styles.cardHeader}>
                <div className={styles.jobInfo}>
                    <h4>{job.title}</h4>
                    <p>Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
                </div>
                <div className={styles.actionButtons}>
                    <button onClick={toggleApplicants} className={styles.toggleBtn}>
                        {showApplicants ? 'Hide Applicants' : 'View Applicants'}
                    </button>
                    <button onClick={() => onDelete(job._id)} className={styles.deleteBtn}>
                        Delete
                    </button>
                </div>
            </div>

            {showApplicants && (
                <div className={styles.applicantsSection}>
                    {loading ? <p>Loading applicants...</p> : (
                        applicants.length === 0 ? <p className={styles.noData}>No applicants yet.</p> : (
                            <table className={styles.applicantsTable}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Skills</th>
                                        <th>Experience</th>
                                        <th>Resume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.map(app => (
                                        <tr key={app._id}>
                                            <td>{app.applicantName}</td>
                                            <td>{app.applicantEmail}</td>
                                            <td>{app.skills}</td>
                                            <td>{app.experience}</td>
                                            <td><a href={app.resumeUrl} target="_blank" rel="noreferrer" className={styles.resumeLink}>View</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default Dashboard;
