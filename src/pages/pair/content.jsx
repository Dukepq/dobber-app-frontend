import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Content(props) {
    let pair = useParams().pair
    useEffect(() => {
        window.localStorage.setItem("DOBBER_LAST_DESTINATION_SPEC", JSON.stringify(pair))
    }, [])
    const {data, dataObject} = props
    const currentData = dataObject?.[pair]
    return (
        <div className="specific-content-wrapper">
            <p>DATA:</p>
            <div className="specific-content-column">
                <p>Price</p>
                <div>{`${currentData?.depthData?.data?.price}€`}</div>
            </div>
            <div className="specific-content-column">
                <p>Exchange</p>
                <div>{currentData?.depthData?.exchange}</div>
            </div>
            <div className="specific-content-column">
                <p>PoP</p>
                <div>{currentData?.volumeData?.periodOverPeriod?.toLocaleString() || "low volume"}</div>
            </div>
            <div className="specific-content-column">
                <p>volatility index</p>
                <div>
                    {currentData?.volumeData?.volatilityArray ?
                    `${((currentData?.volumeData?.volatilityArray?.reduce((acc, cur) => acc + cur, 0) / 5) * 100).toLocaleString()}%`
                    : "low volume"}
                </div>
            </div>
            <div className="specific-content-column">
                <p>ROBS</p>
                <div>{`ROBSb ${currentData?.ROBS?.ROBSb?.toFixed(2) || "-"} - ROBSa ${currentData?.ROBS?.ROBSa?.toFixed(2) || "-"}`}</div>
            </div>
        </div>
    )
}