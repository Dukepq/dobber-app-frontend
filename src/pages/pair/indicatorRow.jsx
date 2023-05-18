import {default as ed}  from "../../extremesDef"
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'

export default function IndicatorRow(props) {
    const {pairData, pair} = props
    console.log(pairData)
    const indicatorImagePairs = [
        {x: ed.ROBS, y: pairData?.ROBS?.ROBSb, image: lowLqImage},
        {x: ed.ROBS, y: pairData?.ROBS?.ROBSa, image: lowLqImage},
        {x: pairData?.depthData?.data?.spread, y: ed.spread, image: spreadImage},
        {x: (pairData?.volumeData?.averageVolume * pairData?.depthData?.data?.price), y: ed.recentVolume, image: volumeImage},
    ]
    return (
        <>
            {indicatorImagePairs.filter(item => {
                return item.x > item.y
            }).map((item, index) => {
                console.log('mapping')
                return <div key={index}><img src={item.image}></img></div>
            })
            }
        </>
    )
}