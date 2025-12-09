import React, { useState } from 'react';
import api from '../../api/axios';
import { useSession } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import styles from './PostJob.module.css';

const PostJob = () => {
    const { session, role, userid } = useSession();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        salaryRange: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting job form...", formData);
        console.log("Session info:", { session, role, userid });

        if (!session || role !== 'employer') {
            console.warn("Unauthorized attempt to post job");
            alert("Unauthorized. Please login as an employer.");
            return;
        }

        try {
            const payload = { ...formData, employerId: userid };
            console.log("Sending payload:", payload);

            const res = await api.post('/jobs', payload);
            console.log("Job post response:", res);

            alert("Job Posted Successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to post job:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                alert(`Error: ${error.response.data.message || "Failed to post job"}`);
            } else {
                alert("Network error or server unreachable");
            }
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.cardContainer}>
                <div className={styles.header}>
                    <div className={styles.iconBox}>✨</div>
                    <div>
                        <h2 className={styles.title}>Post a New Job</h2>
                        <p className={styles.subtitle}>Create a listing to find your perfect candidate</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Job Title</label>
                        <input name="title" placeholder="e.g. Senior Product Designer" value={formData.title} onChange={handleChange} required className={styles.formInput} />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Company</label>
                            <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className={styles.formInput} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Location</label>
                            <input name="location" placeholder="e.g. Remote / New York" value={formData.location} onChange={handleChange} required className={styles.formInput} />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Job Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className={styles.formSelect}>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Salary Range</label>
                            <input name="salaryRange" placeholder="e.g. $50k - $70k" value={formData.salaryRange} onChange={handleChange} className={styles.formInput} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Description</label>
                        <textarea name="description" placeholder="Describe the role, responsibilities, and requirements..." rows="6" value={formData.description} onChange={handleChange} required className={styles.formTextarea} />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitBtn}>Submit Job Post</button>
                        <button type="button" onClick={() => navigate('/dashboard')} className={styles.cancelBtn}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
