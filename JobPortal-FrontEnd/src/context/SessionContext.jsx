// src/context/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(false);
  const [role, setRole] = useState("");
  const [userid, setUserid] = useState("");

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/status");
      console.log("Auth Status Check:", res.data);

      if (res.data.loggedIn) {
        setSession(true);
        setUserid(res.data.user.userId);
        setRole(res.data.user.role);
      } else {
        setSession(false);
        setUserid("");
        setRole("");
      }
    } catch (e) {
      console.log("Auth status check failed:", e);
      setSession(false);
      setUserid("");
      setRole("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setSession(false);
      setRole("");
      setUserid("");
      // checkAuth(); // Optional, but logout clears state locally anyway
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        role,
        userid,
        setRole,
        setUserid,
        logout,
        checkAuth, // Expose checkAuth
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
