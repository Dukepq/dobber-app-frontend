import {default as ed}  from "../../extremesDef"
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'

export default function IndicatorRow(props) {
    const {pairData, pair} = props
    const indicatorImagePairs = [
        {indicator: ed.ROBS, pairValue: pairData.ROBS, image: lowLqImage},
        {indicator: ed.spread, pairValue: pairData.spread, image: spreadImage},
        {indicator: ed.recentVolume, pairValue: pairData.recentVolume, image: volumeImage},
    ]
    console.log(indicatorImagePairs)
    
    return (
        <>
            {indicatorImagePairs.map((item, index) => {
                item.indicator
            })}
        </>
    )
}