import "./pair.css"
import Lookup from "../../components/lookupComp"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function Pair(props) {
    const [selected, setSelected] = useState(() => false)
    const [formData, setFormData] = useState("")
    const {data, dataObject, pairs} = props
    return (
        <div className="pair-wrapper" onClick={(e) => {
            selected && (e.target.id !== "lookup-input-1") && setSelected(() => false)
        }}>
            <div className="content-wrapper">
                <nav className="pair-content-nav">
                    <p className="search-header">SEARCH</p>
                    < Lookup
                    selectionHook = {{selected, setSelected}}
                    formDataHook = {{formData, setFormData}}
                    pairs = {pairs}
                    data = {data}
                    dataObject = {dataObject}
                    />
                </nav>
                <div className="lookup-content">
                    < Outlet />
                </div>
            </div>
        </div>
    )
}