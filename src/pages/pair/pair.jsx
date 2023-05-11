import "./pair.css"
import Lookup from "../../components/lookupComp"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function Pair(props) {
    const [selected, setSelected] = useState(() => false)
    const {data, dataObject, pairs} = props
    return (
        <div className="pair-wrapper" onClick={() => {
            selected && setSelected(() => false)
        }}>
            <div className="content-wrapper">
                <nav className="pair-content-nav">
                    <p className="search-header">SEARCH</p>
                    <div className="search-header-spacer">
                        <p></p>
                        <div className="forecast-el">
                            <p></p>
                            <img src="" alt="" />
                        </div>
                        <div className="forecast-el">
                            <p></p>
                            <img src="" alt="" />
                        </div>
                        <div className="forecast-el">
                            <p></p>
                            <img src="" alt="" />
                        </div>
                    </div>
                    < Lookup
                    selectionHook = {{selected, setSelected}}
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