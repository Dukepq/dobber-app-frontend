import "./pair.css"
import Lookup from "./lookupComp"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function Pair(props) {
    const [selected, setSelected] = useState(() => false)
    const {data, pairs} = props
    return (
        <div className="pair-wrapper">
            <div className="content-wrapper">
                <nav className="pair-content-nav">
                    <p>placeholder text</p>
                    < Lookup
                    selectionHook = {{selected, setSelected}}
                    pairs = {pairs}
                    data = {data}
                    />
                </nav>
                <div className="lookup-content">
                    < Outlet />
                </div>
            </div>
        </div>
    )
}