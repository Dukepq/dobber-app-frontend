import { useState, useEffect} from "react"
import extremesDef from "../../extremesDef"
import Favorite from "../../components/Favorite"
import { Link } from "react-router-dom"

export default function AnalyticsColumns(props) {
    const {userSelection, setUserSelection} = props.userSelectionHook
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
        <div className={`row row-${props.id}`}>
            <div className={`col col-1 col-1-row-${props.id ?? 1}`}><Favorite pair = {props.name} userSelectionHook = {{userSelection, setUserSelection}}/><span><Link to={`/pair/${props.name}`}>{`${props.name}`}</Link></span></div>
            <div className={`col col-2 col-2-row-${props.id ?? 1}`}><a style={{color: "white"}} target="_blank" href={`https://account.bitvavo.com/markets/${props.name}`}><span>{props?.exchange}</span></a></div>
            <div style={{color: ROBSaColor}} className={`col col-3 col-3-row-${props.id ?? 1}`}><span>{(Number(props.ROBSa?.toFixed(3)) || "low volume").toLocaleString('de-DE')}</span></div>
            <div style={{color: ROBSbColor}} className={`col col-4 col-4-row-${props.id ?? 1}`}><span>{(Number(props.ROBSb?.toFixed(3)) || "low volume").toLocaleString('de-DE')}</span></div>
            <div style={{}} className={`col col-5 col-5-row-${props.id ?? 1}`}><span>{props.volatilityIndex !==0
            && props.volatilityIndex ? props.volatilityIndex?.toLocaleString('de-DE') + "%" : "-"}</span></div>
            <div style={{color: spreadColor}} className={`col col-6 col-6-row-${props.id ?? 1}`}><span>{Number((props.spread * 100).toFixed(3)).toLocaleString('de-DE') || "/"}%</span></div>
            <div style={{}} className={`col col-6 col-6-row-${props.id ?? 1}`}><span>{props.volumeData ? Number((props.volumeData)?.toFixed(2)).toLocaleString('de-DE', {style: "currency", currency: "EUR"}) : "0" }</span></div>
        </div>
    )
}