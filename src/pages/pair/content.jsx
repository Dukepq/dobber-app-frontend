import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import IndicatorRow from "./indicatorRow"

export default function Content(props) {
    let pair = useParams().pair
    useEffect(() => {
        window.localStorage.setItem("DOBBER_LAST_DESTINATION_SPEC", JSON.stringify(pair))
    }, [])
    const {data, dataObject} = props
    const currentData = dataObject?.[pair]
    return (
        <>
        <div className="pair-content-simple-wrapper">
            <div className="specific-pair-header-wrapper">
                <h2 className="specific-pair-header">{pair}</h2>
                <IndicatorRow
                pairData = {dataObject?.[pair]}
                pair = {pair}
                />
            </div>
            <div className="specific-content-wrapper">
                <div className="specific-content-area">
                    <p>Price</p>
                    <div>{`${currentData?.depthData?.data?.price}€`}</div>
                </div>
                <div className="specific-content-area">
                    <p>Exchange</p>
                    <div>{currentData?.depthData?.exchange}</div>
                </div>
                <div className="specific-content-area">
                    <p>PoP</p>
                    <div>{currentData?.volumeData?.periodOverPeriod?.toLocaleString() || "low volume"}</div>
                </div>
                <div className="specific-content-area">
                    <p>volatility index</p>
                    <div>
                        {currentData?.volumeData?.volatilityArray ?
                        `${((currentData?.volumeData?.volatilityArray?.reduce((acc, cur) => acc + cur, 0) / 5) * 100).toLocaleString()}%`
                        : "low volume"}
                    </div>
                </div>
                <div className="specific-content-area">
                    <p>ROBS</p>
                    <div>{`ROBSb ${currentData?.ROBS?.ROBSb?.toFixed(2) || "-"} - ROBSa ${currentData?.ROBS?.ROBSa?.toFixed(2) || "-"}`}</div>
                </div>
            </div>
        </div>
        </>
    )
}