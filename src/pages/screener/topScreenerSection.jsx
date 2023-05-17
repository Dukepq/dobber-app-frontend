import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../userContext"

import ScreenerSegment from "./ScreenerSegment"
export default function TopScreenerSection(props) {
    const [largestPairs, setLargestPairs] = useState([])
    const [volumeToday, setVolumeToday] = useState(0)
    const {data} = props
    const {key} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:5003/api/v1/daily/total', {
            headers: {
                "Content-Type": "application/json",
                "Content-Length": key.length.toString(),
                "X-Token": key.toString(),
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setVolumeToday(() => Number(data.data))
        })
    }, [])
    useEffect(() => {
        fetch('http://localhost:5003/api/v1/daily/largest', {
            headers: {
                "Content-Type": "application/json",
                "Content-Length": key.length.toString(),
                "X-Token": key.toString(),
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setLargestPairs(prev => {
                    let pairs = []
                    for (let i = 0; i < 3; i++) {
                        pairs.push(data.largestDaily[i])
                    }
                    return pairs
                })
            })
        const interval = setInterval(() => {
            fetch('http://localhost:5003/api/v1/daily/largest', {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": key.length.toString(),
                    "X-Token": key.toString(),
                },
                method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                setLargestPairs(prev => {
                    let pairs = []
                    for (let i = 0; i < 3; i++) {
                        pairs.push(data.largestDaily[i])
                    }
                    return pairs
                })
            })
        }, 60000)
        return () => {
            if (interval) {
                clearInterval(interval)
            } 
        }
    }, [])
    return (
        <div className="top-wrapper">
            <div className="top-left-section">
                <h2>24H EXCHANGE VOLUME</h2>
                <p>{volumeToday?.toLocaleString('de-DE', {style: "currency", currency: "EUR", maximumFractionDigits: 6})}</p>
            </div>
            <div className="top-right-section">
                {largestPairs?.map((item, index) => {
                    return <ScreenerSegment
                    key = {index}
                    id = {index}
                    pair = {largestPairs[index].market}
                    volumeQuote = {largestPairs[index].volumeQuote}
                    data = {data}
                    />
                })}
            </div>
        </div>
    )
}