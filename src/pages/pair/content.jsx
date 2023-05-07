import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Content(props) {
    let pair = useParams().pair
    useEffect(() => {
        window.localStorage.setItem("DOBBER_LAST_DESTINATION_SPEC", JSON.stringify(pair))
    }, [])
    const {data} = props
    const currentPair = data.find(item => item.depthData.pair === pair)
    console.log(currentPair)

    return (
        <div>
            <p>DATA:</p>
            <div>{JSON.stringify(currentPair)}</div>
        </div>
    )
}