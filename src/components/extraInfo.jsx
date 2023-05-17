import { useState } from "react"
import React from 'react'
import questionMark from "../assets/question-mark.svg"

export default function ExtraInfo(props) {
    const [hovered, setHovered] = useState(false)
    const handleHover = () => {
        setHovered(prev => !prev)
    }
    return (
        <div className='hover-container'>
            <p style={{color: "var(--primary-text-color)"}} className={`display-on-hover ${hovered ? "active" : ""}`} >{props.textContent}</p>
            <img className={`exclamation`} src={questionMark} onMouseEnter={handleHover} onMouseLeave={handleHover} alt=""
            />
        </div>
    )
}
