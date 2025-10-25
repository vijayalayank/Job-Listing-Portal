import style from "./NavBar.module.css"
import { Link } from "react-router-dom"

export function NavBar(){
    return(<>
        <nav className={style.navbar}>
        <div className={style.logo}>JobPortal</div>
        <div className={style.navlink}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Register/Login</Link>
        </div>
      </nav>
    </>)
}