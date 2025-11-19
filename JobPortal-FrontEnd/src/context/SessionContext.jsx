// src/context/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(false);
  const [role, setRole] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(() => {
    async function check() {
      try {
        const res = await api.get("/auth/status");
        console.log(res);
        
        // Example response:
        // res.data = { loggedIn: true, user: { userId: "...", role: "jobseeker" } }

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
    }

    check();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        role,
        userid,
        setRole,
        setUserid,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
