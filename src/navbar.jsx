import {useState} from 'react'
import "./assets/navbar.css"

export default function Navbar() {
    return (
    <>
        <nav className="navigation">
            <ul className="navbar-nav">
                <li>
                    <img className='nav-logo' src="/DobberLogo.svg" alt="logo" />
                </li>
                <li>
                    <a href="">
                        <img aria-hidden="true" className="navbar-item-image"src="/home.svg" alt="" />
                        <span className='nav-text'>Homepage</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img aria-hidden="true" className="navbar-item-image"src="/flame.svg" alt="" />
                        <span className='nav-text'>Volatile</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img aria-hidden="true" className="navbar-item-image"src="/coins-solid.svg" alt="" />
                        <span className='nav-text'>Screener</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img aria-hidden="true" className="navbar-item-image"src="/docs-icon.svg" alt="" />
                        <span className='nav-text'>Docs</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img aria-hidden="true" className="navbar-item-image"src="/leave.svg" alt="" />
                        <span className='nav-text'>Exit</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>
)}
