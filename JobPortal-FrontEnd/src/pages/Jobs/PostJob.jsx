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
        <div className={styles.postJobContainer}>
            <h2 className={styles.title}>Post a New Job</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required className={styles.formInput} />
                <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className={styles.formInput} />
                <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className={styles.formInput} />

                <select name="type" value={formData.type} onChange={handleChange} className={styles.formSelect}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>

                <input name="salaryRange" placeholder="Salary Range (e.g. $50k - $70k)" value={formData.salaryRange} onChange={handleChange} className={styles.formInput} />

                <textarea name="description" placeholder="Job Description" rows="5" value={formData.description} onChange={handleChange} required className={styles.formTextarea} />

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn}>Submit Job Post</button>
                    <button type="button" onClick={() => navigate('/dashboard')} className={styles.cancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
