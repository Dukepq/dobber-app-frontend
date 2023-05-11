import "./assets/navbar.css"
import {Link, Outlet} from "react-router-dom"
import lookingGlassImage from "./assets/looking-glass.svg"
import { useContext } from "react"
import { ThemeContext } from "./useTheme"

export default function Navbar() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
    <>
        <nav className="navigation">
            <ul className="navbar-nav">
                <li>
                    <img className='nav-logo' src="/DobberLogo.svg" alt="logo" />
                </li>
                <li>
                    <Link to="/home">
                        <img aria-hidden="true" className="navbar-item-image"src="/home.svg" alt="" />
                        <span className='nav-text'>Homepage</span>
                    </Link>
                </li>
                <li>
                    <Link to="/pair">
                        <img aria-hidden="true" className="navbar-item-image"src={lookingGlassImage} alt="" />
                        <span className='nav-text'>Search</span>
                    </Link>
                </li>
                <li>
                    <Link to="/app">
                        <img aria-hidden="true" className="navbar-item-image"src="/coins-solid.svg" alt="" />
                        <span className='nav-text'>Screener</span>
                    </Link>
                </li>
                <li>
                    <Link to="/docs">
                        <img aria-hidden="true" className="navbar-item-image"src="/docs-icon.svg" alt="" />
                        <span className='nav-text'>Docs</span>
                    </Link>
                </li>
                <li>
                    <div onClick={toggleTheme}>
                        <img aria-hidden="true" className="navbar-item-image"src="/leave.svg" alt="" />
                        <span className='nav-text'>Theme</span>
                    </div>
                </li>
            </ul>
        </nav>
        < Outlet /> 
        {/* creates a 'hole' in which react components can be rendered*/}
    </>
)}
