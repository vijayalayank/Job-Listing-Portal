import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Brand Section */}
                <div className={styles.brandSection}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>💼</span>
                        JobPortal
                    </div>
                    <p className={styles.tagline}>
                        Connecting talented professionals with their dream careers.
                    </p>
                </div>

                {/* Links Section: Job Seekers */}
                <div className={styles.linkColumn}>
                    <h3>For Job Seekers</h3>
                    <ul>
                        <li><Link to="/jobs">Browse Jobs</Link></li>
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/register">Create Profile</Link></li>
                        <li><Link to="/career-advice">Career Advice</Link></li>
                    </ul>
                </div>

                {/* Links Section: Employers */}
                <div className={styles.linkColumn}>
                    <h3>For Employers</h3>
                    <ul>
                        <li><Link to="/post-job" style={{ pointerEvents: 'auto' }}>Post a Job</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/browse-candidates">Browse Candidates</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className={styles.contactColumn}>
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <span className={styles.icon}>✉️</span>
                            project@jobportal.com
                        </li>
                        <li>
                            <span className={styles.icon}>📞</span>
                            +91 7540027179
                        </li>
                        <li>
                            <span className={styles.icon}>📍</span>
                            123 Business Street, New York, NY 10001
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; 2025 JobPortal. All rights reserved.</p>
                <div className={styles.legalLinks}>
                    <a href="/General_Policy.txt" target="_blank" rel="noopener noreferrer" className={styles.policyLink}>
                        General Policy (Privacy, Terms & Cookies)
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
