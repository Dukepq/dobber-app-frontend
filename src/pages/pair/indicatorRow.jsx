import {default as ed}  from "../../extremesDef"
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'

export default function IndicatorRow(props) {
    const {pairData, pair} = props
    console.log(pairData)
    const indicatorImagePairs = [
        {indicator: ed.ROBS, pairValue: pairData?.ROBS?.ROBSb, image: lowLqImage},
        {indicator: ed.spread, pairValue: pairData?.depthData?.data?.spread, image: spreadImage},
        {indicator: ed.recentVolume, pairValue: pairData?.volumeData?.averageVolume, image: volumeImage},
    ]
    console.log(indicatorImagePairs)
    
    return (
        <>
            {indicatorImagePairs.filter(item => {
                console.log(item)
                console.log(item.indicator < item.pairValue)
                return (item.indicator > item.pairValue)
            }).map((item, index) => {
                console.log('mapping')
                return <div key={index}><img src={item.image}></img></div>
            })
            }
        </>
    )
}