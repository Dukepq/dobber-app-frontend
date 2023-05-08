import { useState, useEffect } from 'react'
import lookingGlass from '../../assets/looking-glass.svg'
import { Link } from 'react-router-dom'
import spreadImage from '../../assets/spread.svg'
import lowLqImage from '../../assets/lowLiquidity.svg'
import volumeImage from '../../assets/water.svg'
import risingImage from '../../assets/rising.svg'


export default function Lookup(props) {
    const [formData, setFormData] = useState("")
    const {selected, setSelected} = props.selectionHook
    const {pairs, data, dataObject} = props
    const handleChange = (e) => {
        setFormData(() => e.target.value)
    }
    return (
        <div className='lookup-content-wrapper' onMouseEnter={() => setSelected(true)} onMouseLeave={() => setSelected(false)}>
            <img className='looking-glass-img' src={lookingGlass} alt="" />
            <div className='input-dropdown-wrap'>
                <input className={selected ? "lookup-input lookup-input-hovered" : "lookup-input"} type="text"
                    value={formData} onChange={handleChange}/>
                {selected && (<div className="search-nav">
                {
                pairs.filter(item => {
                    const searching = formData.toLowerCase()
                    const currentItem = item.toLowerCase()
                    return currentItem.startsWith(searching)
                }).map((item, index) => {
                    return <Link className='dropdown-menu-pair' // getting data by index, need to get data from an object
                    key={index} to={`/pair/${item}`}>{item}
                    {
                        (Number(dataObject[item]?.depthData?.data?.depthRatio) < 0.25 || Number(dataObject[item]?.depthData?.data?.depthRatio) > 4)
                        ? <img src={risingImage}></img> : (Number(dataObject[item]?.volumeData?.averageVolume) * Number(dataObject[item]?.depthData?.data?.price) > 3000)
                        ? <img src={volumeImage}></img> : (Number(dataObject[item]?.depthData?.data?.spread) * 100 > 1)
                        ? <img src={spreadImage}></img> : (Number(dataObject[item]?.ROBS?.ROBSb) < 5 || Number(dataObject[item]?.ROBS?.ROBSa) < 5)
                        ? <img src={lowLqImage}></img> : null
                        // handleSymbolSelect(data, index)
                    }
                    </Link>
                })}
                </div>)}
            </div>
        </div>
    )
}