import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useSession } from "../../context/SessionContext";
// import { useEffect } from "react";


export function NavBar() {
  const { session, role, userid,setSession } = useSession();
  
  console.log(role);
  console.log(userid);
  
  // useEffect(()=>{
  //     async function userDetail(){
  //       try{
  //         const result = api.get("/info/:userid");
  //       }
  //       catch(e){
  //         console.log(e);
          
  //       }
  //     }

  //     userDetail();
  // })

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setSession(false);
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>JobPortal</div>

      <div className={style.navlink}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!session && (
          <div className={style.auth}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}

        {session && (
          <div className={style.auth}>

            <div>{role}</div>
            <button onClick={handleLogout} className={style.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
