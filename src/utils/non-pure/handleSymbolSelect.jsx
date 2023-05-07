import flameImage from '../../assets/flame.svg'
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'


export default function handleSymbolSelect(data, index) {
    console.log(Number(data[index]?.depthData?.data?.spread))
    if (Number(data[index]?.ROBS?.ROBSb) < 5) return <img src={lowLqImage}></img>
    else if (Number(data[index]?.depthData?.data?.spread) * 100 > 1) return <img src={spreadImage}></img>
    else if (Number(data[index]?.volumeData?.averageVolume) * Number(data[index]?.depthData?.data?.price) > 3000) return <img src={volumeImage}></img>
    else if (Number(data[index]?.depthData?.data?.depthRatio) < 0.25 || Number(data[index]?.depthData?.data?.depthRatio) > 4) return <img src={risingImage}></img>
    else return null
    }