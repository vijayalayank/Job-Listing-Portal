import style from "./NavBar.module.css"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"


export function NavBar(){

const [session,setsession] = useState(false);




    return(<>
        <nav className={style.navbar}>
         <div className={style.logo}>JobPortal</div>
         <div className={style.navlink}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {!session &&
            <div className={style.auth}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            </div>
          }
        </div>
      </nav>
    </>)
}