import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useSession } from "../../context/SessionContext";

export function NavBar() {
  const { session, role, userid, logout } = useSession();

  const handleLogout = async () => {
    if (logout) {
      await logout();
      window.location.href = '/'; // Hard refresh to clear state
    } else {
      // Fallback if context not updated yet
      try {
        await api.post("/auth/logout");
        window.location.reload();
      } catch (e) {
        console.error("Logout failed", e);
      }
    }
  };

  return (
    <nav className={style.navbar}>
      <Link to="/" className={style.logo} style={{ textDecoration: 'none' }}>
        <span style={{ background: '#6366f1', color: 'white', padding: '4px 8px', borderRadius: '6px', marginRight: '8px' }}>💼</span>
        JobPortal
      </Link>

      <div className={style.centerLinks}>
        <Link to="/jobs">Find Jobs</Link>
        <Link to="/dashboard">For Employers</Link>
        <Link to="/about">About</Link>
      </div>

      <div className={style.authSection}>
        {!session ? (
          <>
            <Link to="/login" className={style.loginLink}>Sign In</Link>
            <Link to="/register" className={style.registerBtn}>Get Started</Link>
          </>
        ) : (
          <>
            {role === 'employer' && (
              <Link to="/post-job" className={style.postJobBtn}>+ Post Job</Link>
            )}
            <Link to="/dashboard" className={style.dashboardLink}>Dashboard</Link>
            <span className={style.roleBadge}>{role}</span>
            <button onClick={handleLogout} className={style.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
