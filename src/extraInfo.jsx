import { useState } from "react"

export default function ExtraInfo(props) {
    const [hovered, setHovered] = useState(false)
    const handleHover = () => {
        setHovered(prev => !prev)
    }

    return (
        <div className='hover-container'>
            <p className={`display-on-hover ${hovered ? "active" : ""}`} >{props.textContent}</p>
            <img className={`exclamation`} src="exclamation.svg" onMouseEnter={handleHover} onMouseLeave={handleHover} alt="" />
        </div>
    )
}
