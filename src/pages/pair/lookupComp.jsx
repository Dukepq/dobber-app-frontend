import { useState, useEffect } from 'react'
import lookingGlass from '../../assets/looking-glass.svg'
import { Link } from 'react-router-dom'
import handleSymbolSelect from '../../utils/non-pure/handleSymbolSelect'


export default function Lookup(props) {
    const [formData, setFormData] = useState("")
    const {selected, setSelected} = props.selectionHook
    const {pairs, data} = props
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
                    return <Link className='dropdown-menu-pair'
                    key={index} to={`/pair/${item}`}>{item}
                    {
                        handleSymbolSelect(data, index)
                    }
                    </Link>
                })}
                </div>)}
            </div>
        </div>
    )
}