import { useState, useEffect} from "react"

export default function AnalyticsColumns(props) {
    const [ROBSaColor, setROBSaColor] = useState("white")
    const [ROBSbColor, setROBSbColor] = useState("white")
    const [spreadColor, setSpreadColor] = useState("white")
    const [depthColor, setDepthColor] = useState("white")
    useEffect(() => {
        highlight(props.ROBSa, props.averages.ROBSaAvg, colorBoundsArr, colorArray, setROBSaColor)
        highlight(props.ROBSb, props.averages.ROBSbAvg, colorBoundsArr, colorArray, setROBSbColor)
        highlight(props.spread, props.averages.spreadAvg, colorBoundsArr, colorArray.reverse(), setSpreadColor)
    }, [props.averages])
    const colorBoundsArr = [0.1, 0.3, 0.8, 1,  1.2]
    const colorArray = ["#ff0000", "#c1523c", "#d28d31", "#cb983a", "#bfd044", "#57ff62"]
    const highlight = async (value, relativeTo, bounds, colorArray, hook) => {
        if (!value || !relativeTo) {
            hook("grey")
            return
        }
        if (value < bounds[0] * relativeTo) hook(colorArray[0])
        else if (bounds[0] * relativeTo <= value && value < bounds[1] * relativeTo) hook(colorArray[1])
        else if (bounds[1] * relativeTo <= value && value < bounds[2] * relativeTo) hook(colorArray[2])
        else if (bounds[2] * relativeTo <= value && value < bounds[3] * relativeTo) hook(colorArray[3])
        else if (bounds[3] * relativeTo <= value && value < bounds[4] * relativeTo) hook(colorArray[4])
        else if (value >= bounds[4] * relativeTo) hook(colorArray[5])
        else hook("white")
    }

    return (
        <div className={`col col-${props.id}`}>
            <div className={`row row-1 row-1-col-${props.id ?? 1}`}><span><a target="_blank" href={`https://account.bitvavo.com/markets/${props.name}`}>{props.name}</a></span></div>
            <div className={`row row-2 row-2-col-${props.id ?? 1}`}><span>{props.exchange}</span></div>
            <div style={{color: ROBSaColor}} className={`row row-3 row-3-col-${props.id ?? 1}`}><span>{props.ROBSa?.toFixed(3) || "low volume"}</span></div>
            <div style={{color: ROBSbColor}} className={`row row-4 row-4-col-${props.id ?? 1}`}><span>{props.ROBSb?.toFixed(3) || "low volume"}</span></div>
            <div style={{color: depthColor}} className={`row row-5 row-5-col-${props.id ?? 1}`}><span>{props.depthRatio?.toFixed(3) || "/"}</span></div>
            <div style={{color: spreadColor}} className={`row row-6 row-6-col-${props.id ?? 1}`}><span>{(props.spread * 100).toFixed(3) || "/"}%</span></div>
            <div style={{color: "white"}} className={`row row-6 row-6-col-${props.id ?? 1}`}><span>{`${(props.volumeData)?.toFixed(2) || "-"}` }</span></div>
        </div>
    )
}