import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Features from "../../components/Home/Features/Features";
import FeaturedJobs from "../../components/Home/FeaturedJobs/FeaturedJobs";

import { useSession } from "../../context/SessionContext";

// Local image from assets
const HERO_IMAGE_URL = "/Image/landing_hero.png";

export function Home() {
    const { session, role } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className={styles.homeContainer}>
            {/* Background Gradient */}
            <div className={styles.backgroundGradient}></div>

            {/* Hero Section Wrapper */}
            <div className={styles.heroWrapper}>
                <div className={styles.heroSection}>
                    {/* Left Content */}
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Find Your <span className={styles.highlight}>Dream Job</span> Today
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Connect with top employers and discover thousands of opportunities tailored to your skills and aspirations.
                        </p>

                        {role === 'employer' ? (
                            <div className={styles.employerActions}>
                                <Link to="/post-job" className={styles.heroPostJobBtn}>+ Post a New Job</Link>
                                <Link to="/dashboard" className={styles.heroDashboardBtn}>Go to Dashboard</Link>
                            </div>
                        ) : (
                            <form className={styles.searchBarContainer} onSubmit={handleSearch}>
                                <div className={styles.searchIcon}>🔍</div>
                                <input
                                    type="text"
                                    placeholder="Job title, keywords, or company"
                                    className={styles.heroSearchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.heroSearchBtn}>Search Jobs</button>
                            </form>
                        )}

                        <div className={styles.statsRow}>
                            <div className={styles.statItem}>
                                <h3>10K+</h3>
                                <p>Active Jobs</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>5K+</h3>
                                <p>Companies</p>
                            </div>
                            <div className={styles.statItem}>
                                <h3>40K+</h3>
                                <p>Hired</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className={styles.heroImageWrapper}>
                        <img src={HERO_IMAGE_URL} alt="Modern Office" className={styles.heroImage} />

                        {/* Floating Success Card */}
                        <div className={styles.floatingCard}>
                            <div className={styles.iconBox}>📈</div>
                            <div className={styles.cardText}>
                                <h4>98% Success Rate</h4>
                                <p>Job placement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <Features />

            {/* Featured Opportunities Section */}
            <FeaturedJobs />

        </div>
    );
}