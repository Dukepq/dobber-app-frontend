import { useState, useEffect } from 'react'
import lookingGlass from '../assets/looking-glass.svg'
import { Link } from 'react-router-dom'
import spreadImage from '../assets/spread.svg'
import lowLqImage from '../assets/lowLiquidity.svg'
import volumeImage from '../assets/water.svg'
import risingImage from '../assets/rising.svg'
import extremesDef from '../extremesDef'

export default function Lookup(props) {
    const [formData, setFormData] = useState("")
    const {selected, setSelected} = props.selectionHook
    const {pairs, data, dataObject} = props
    const handleChange = (e) => {
        setFormData(() => e.target.value)
    }

    return (
        <div className='lookup-content-wrapper'>
            <img className='looking-glass-img' src={lookingGlass} alt="" />
            <div className='input-dropdown-wrap'>
                <input className={selected ? "lookup-input lookup-input-hovered" : "lookup-input"} type="text"
                    value={formData} onChange={handleChange} onClick={() => setSelected(prev => !prev)}/>
                {selected && (<div className="search-nav">
                {
                pairs.filter(item => {
                    const searching = formData.toLowerCase()
                    const currentItem = item.toLowerCase()
                    return currentItem.startsWith(searching)
                }).map((item, index) => {
                    return <div className='dropdown-menu-pair' key={index}><Link // getting data by index, need to get data from an object
                    to={`/pair/${item}`}>{item}
                    {
                        (Number(dataObject[item]?.ROBS?.ROBSb) < extremesDef.ROBS || Number(dataObject[item]?.ROBS?.ROBSa) < extremesDef.ROBS)
                        ? <img className='indicator-img' src={lowLqImage}></img> : (Number(dataObject[item]?.depthData?.data?.spread) * 100 > extremesDef.spread)
                        ? <img className='indicator-img' src={spreadImage}></img> : (Number(dataObject[item]?.volumeData?.averageVolume) * Number(dataObject[item]?.depthData?.data?.price) > extremesDef.recentVolume)
                        ? <img className='indicator-img' src={volumeImage}></img> : (Number(dataObject[item]?.depthData?.data?.depthRatio) < extremesDef.depthRatioB || Number(dataObject[item]?.depthData?.data?.depthRatio) > extremesDef.depthRatioA)
                        ? <img className='indicator-img' src={risingImage}></img> : null
                    }
                    </Link></div>
                })}
                </div>)}
            </div>
        </div>
    )
}