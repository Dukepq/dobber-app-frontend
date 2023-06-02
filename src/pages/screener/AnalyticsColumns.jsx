import { useState, useEffect} from "react"
import extremesDef from "../../extremesDef"
import Favorite from "../../components/Favorite"
import { Link } from "react-router-dom"
import { colorPicker } from "./colorPicker"
import ExclamationImage from "../../assets/triangle-exclamation-solid.svg"

export default function AnalyticsColumns(props) {
    const {userSelection, setUserSelection} = props.userSelectionHook
    const [colors, setColors] = useState({
        ROBSa: "white",
        ROBSb: "white",
        spread: "white",
        volatilityIndex: "white",
    })
    const {selectedIndicator} = props
    const { volatilityIndex, spread, recentVolume, ROBS } = extremesDef

    const checkForAbnormality = () => {
        if ((props.volumeData > recentVolume / 2 && props.volatilityIndex === 0)) return true
    }

    useEffect(() => {
        const ROBSaColor = colorPicker(props.ROBSa, ROBS)
        const ROBSbColor = colorPicker(props.ROBSb, ROBS)
        const spreadColor = colorPicker(props.spread, spread, true)
        const volatilityIndexColor = colorPicker(Number(props.volatilityIndex?.toFixed(3)), volatilityIndex, true)
        setColors(prev => {
            return {...prev,
                ROBSa: ROBSaColor,
                ROBSb: ROBSbColor,
                spread: spreadColor,
                volatilityIndex: volatilityIndexColor,
            }
        })
    }, [props])
    
    return (
        <div className={`row row-${props.id}`} style={userSelection.includes(props.name) ? {backgroundColor: "rgba(0, 0, 255, 0.12)"} : {}}>
            <div className={`col col-1 col-1-row-${props.id ?? 1}`}><Favorite pair={props.name} userSelectionHook = {{userSelection, setUserSelection}}/>
            <span><Link to={`/pair/${props.name}`}>{`${props.name}`}</Link></span>{checkForAbnormality() && <img className="screener-alert-image" src={ExclamationImage} alt="" />}</div>
            <div className={`col col-2 col-2-row-${props.id ?? 1}`}><a target="_blank" href={`https://account.bitvavo.com/markets/${props.name}`}><span>{props?.exchange}</span></a></div>
            <div style={{color: colors.ROBSa}} className={`col col-3 col-3-row-${props.id ?? 1}`}><span>{(Number(props.ROBSa?.toFixed(3)) || "low volume").toLocaleString('de-DE')}</span></div>
            <div style={{color: colors.ROBSb}} className={`col col-4 col-4-row-${props.id ?? 1}`}><span>{(Number(props.ROBSb?.toFixed(3)) || "low volume").toLocaleString('de-DE')}</span></div>
            <div style={{color: colors.volatilityIndex}} className={`col col-5 col-5-row-${props.id ?? 1}`}><span>{props.volatilityIndex !== 0
            && props.volatilityIndex ? props.volatilityIndex?.toLocaleString('de-DE', {maximumFractionDigits: 3}) + "%" : ""}</span></div>
            <div style={{color: colors.spread}} className={`col col-6 col-6-row-${props.id ?? 1}`}><span>{Number((props.spread * 100).toFixed(3)).toLocaleString('de-DE') || "/"}%</span></div>
            <div style={{}} className={`col col-7 col-7-row-${props.id ?? 1}`}><span>{props.volumeData ? Number((props.volumeData)?.toFixed(2)).toLocaleString('de-DE', {style: "currency", currency: "EUR"}) : "0" }</span></div>
            {selectedIndicator?.length > 0 && (
                <div className={`col col-custom col-custom-row-${props.id ?? 1}`}>
                    <span>{`${props[selectedIndicator[0]?.indicator] ? props[selectedIndicator[0]?.indicator]?.toLocaleString('de-DE', {maximumFractionDigits: 3}) : "-"} ${selectedIndicator[0]?.iUnit}`}</span>
                </div>
            )}
            {selectedIndicator.length < 1 && <div className={`col col-8 col-8-row-${props.id ?? 1}`}></div>}
        </div>
    )
}