import React from 'react';
import styles from './Features.module.css';

const features = [
    {
        title: "Smart Job Search",
        desc: "Advanced filters to find jobs matching your skills, location, and salary expectations.",
        icon: "🔍", // Replacing with SVG below
        iconClass: styles.iconPurple
    },
    {
        title: "Profile Management",
        desc: "Create detailed profiles with resumes and showcase your experience to employers.",
        icon: "👤",
        iconClass: styles.iconPurple // Image looked like user icon had purple/blue bg. Let's vary it.
    },
    {
        title: "Easy Applications",
        desc: "Apply to multiple jobs with one click and track all your applications in one place.",
        icon: "💼",
        iconClass: styles.iconPurple
    },
    {
        title: "For Employers",
        desc: "Post jobs, manage listings, and find the perfect candidates for your team.",
        icon: "📊",
        iconClass: styles.iconGreen
    },
    {
        title: "Secure & Private",
        desc: "Your data is protected with industry-standard security and encryption.",
        icon: "🛡️",
        iconClass: styles.iconBlue // Using Blue as per design
    },
    {
        title: "Real-time Updates",
        desc: "Get instant notifications about new jobs and application status changes.",
        icon: "⚡",
        iconClass: styles.iconPurple
    }
];

// SVG Icons for better quality
const SearchIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const UserIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const BriefcaseIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const ChartIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
);
const ShieldIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const BoltIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

const Features = () => {
    return (
        <div className={styles.featuresSection}>
            <h2 className={styles.title}>Everything You Need to <span className={styles.highlight}>Succeed</span></h2>
            <p className={styles.subtitle}>Powerful features designed for both job seekers and employers</p>

            <div className={styles.featuresGrid}>
                {/* Card 1 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                        <SearchIcon />
                    </div>
                    <h3 className={styles.cardTitle}>Smart Job Search</h3>
                    <p className={styles.cardDesc}>Advanced filters to find jobs matching your skills, location, and salary expectations.</p>
                </div>

                {/* Card 2 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                        <UserIcon />
                    </div>
                    <h3 className={styles.cardTitle}>Profile Management</h3>
                    <p className={styles.cardDesc}>Create detailed profiles with resumes and showcase your experience to employers.</p>
                </div>

                {/* Card 3 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                        <BriefcaseIcon />
                    </div>
                    <h3 className={styles.cardTitle}>Easy Applications</h3>
                    <p className={styles.cardDesc}>Apply to multiple jobs with one click and track all your applications in one place.</p>
                </div>

                {/* Card 4 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                        <ChartIcon />
                    </div>
                    <h3 className={styles.cardTitle}>For Employers</h3>
                    <p className={styles.cardDesc}>Post jobs, manage listings, and find the perfect candidates for your team.</p>
                </div>

                {/* Card 5 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                        <ShieldIcon />
                    </div>
                    <h3 className={styles.cardTitle}>Secure & Private</h3>
                    <p className={styles.cardDesc}>Your data is protected with industry-standard security and encryption.</p>
                </div>

                {/* Card 6 */}
                <div className={styles.featureCard}>
                    <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                        <BoltIcon />
                    </div>
                    <h3 className={styles.cardTitle}>Real-time Updates</h3>
                    <p className={styles.cardDesc}>Get instant notifications about new jobs and application status changes.</p>
                </div>

            </div>
        </div>
    );
};

export default Features;
