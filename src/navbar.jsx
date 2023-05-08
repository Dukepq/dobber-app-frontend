import {useState} from 'react'
import "./assets/navbar.css"
import {Link, Outlet} from "react-router-dom"


export default function Navbar() {
    return (
    <>
        <nav className="navigation">
            <ul className="navbar-nav">
                <li>
                    <img className='nav-logo' src="/DobberLogo.svg" alt="logo" />
                </li>
                <li>
                    <Link to="/app">
                        <img aria-hidden="true" className="navbar-item-image"src="/home.svg" alt="" />
                        <span className='nav-text'>Homepage</span>
                    </Link>
                </li>
                <li>
                    <Link to="/pair">
                        <img aria-hidden="true" className="navbar-item-image"src="/flame.svg" alt="" />
                        <span className='nav-text'>Volatile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/abc">
                        <img aria-hidden="true" className="navbar-item-image"src="/coins-solid.svg" alt="" />
                        <span className='nav-text'>Screener</span>
                    </Link>
                </li>
                <li>
                    <Link to="/abc">
                        <img aria-hidden="true" className="navbar-item-image"src="/docs-icon.svg" alt="" />
                        <span className='nav-text'>Docs</span>
                    </Link>
                </li>
                <li>
                    <Link to="abc">
                        <img aria-hidden="true" className="navbar-item-image"src="/leave.svg" alt="" />
                        <span className='nav-text'>Exit</span>
                    </Link>
                </li>
            </ul>
        </nav>
        < Outlet /> 
        {/* creates a 'hole' in which react components can be rendered*/}
    </>
)}
