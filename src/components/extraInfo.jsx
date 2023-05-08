import { useState } from "react"
import React from 'react'
import ExclamationIcon from "../assets/exclamation.svg"

export default function ExtraInfo(props) {
    const [hovered, setHovered] = useState(false)
    const handleHover = () => {
        setHovered(prev => !prev)
    }
    return (
        <div className='hover-container'>
            <p className={`display-on-hover ${hovered ? "active" : ""}`} >{props.textContent}</p>
            <img className={`exclamation`} src={ExclamationIcon} onMouseEnter={handleHover} onMouseLeave={handleHover} alt="" />
        </div>
    )
}
