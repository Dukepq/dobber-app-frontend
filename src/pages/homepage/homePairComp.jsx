import { useEffect } from "react"
import ExclamationImg from "../../assets/exclamation.svg"
import extremesDef from "../../extremesDef"
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'

export default function HomePair(props) {
    const {data} = props
    const {userSelection, setUserSelection} = props.userSelectionHook
    useEffect(() => {
        window.localStorage.setItem("DOBBER_USER_PREFERRED_SELECTION#981", JSON.stringify(userSelection))
    }, [userSelection])
    const handleClick = () => {
        setUserSelection(prev => {
            if (typeof userSelection === "string" || typeof(userSelection) === "undefined") {
                window.localStorage.removeItem("DOBBER_USER_PREFERRED_SELECTION#981")
                return
            }
            try {
                if (userSelection.length < 12 && !userSelection.includes(data?.depthData?.pair)) {
                    return [...prev, data?.depthData?.pair]
                } else return [...prev]
            } catch(err) {
                console.log(err)
                window.localStorage.removeItem("DOBBER_USER_PREFERRED_SELECTION#981")
            }})}
    return (
        <div className="pair-component-wrapper">
            <div className="pair-component-header">
                <div className="price-and-pair-home">
                    <p className="home-pair-clip">{data?.depthData?.pair}</p>
                    <p className="home-pair-clip">{`${data?.depthData?.data?.price?.toLocaleString('de-DE', {style: "currency", currency: "EUR", maximumFractionDigits: 6})}`}</p>
                    <img className='indicator-img' src={
                        (Number(data?.ROBS?.ROBSb) < extremesDef.ROBS || Number(data?.ROBS?.ROBSa) < extremesDef.ROBS)
                        ?  lowLqImage : (Number(data?.depthData?.data?.spread) > extremesDef.spread)
                        ?  spreadImage : (Number(data?.volumeData?.averageVolume) * Number(data?.depthData?.data?.price) > extremesDef.recentVolume)
                        ?  volumeImage : (Number(data?.depthData?.data?.depthRatio) < extremesDef.depthRatioB || Number(data?.depthData?.data?.depthRatio) > extremesDef.depthRatioA)
                        ?  risingImage : null
                    } alt="" 
                    />
                </div>
                <p className="home-pair-clip">{data?.depthData?.exchange}</p>
            </div>
            <div className="pair-component-content">
                <div className="home-grid-data-comp"><p>{data?.depthData?.data?.spread}</p></div>
                <div className="home-grid-data-comp"><p>{data?.depthData?.data?.spread}</p></div>
                <div className="home-grid-data-comp"><p>{data?.depthData?.data?.depthRatio}</p></div>
                <div className="home-grid-data-comp"><p>{data?.ROBS?.ROBSa}</p></div>
                <div className="home-grid-data-comp"><p>{data?.ROBS?.ROBSa}</p></div>
                <div className="home-grid-data-comp"><p>{data?.volumeData?.periodOverPeriod}</p></div>
                <div className="home-grid-data-comp"><p>{(data?.volumeData?.volatilityArray?.reduce((acc, cur) => {
                    return acc + cur
                }) / 6)*100}%</p></div>
                <div className="home-grid-data-comp"><p>CONTENT HERE</p></div>
                <div onClick={handleClick} className="home-grid-data-comp"></div>
            </div>
        </div>
    )
}