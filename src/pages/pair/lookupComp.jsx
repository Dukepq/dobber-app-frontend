import { useState, useEffect } from 'react'
import lookingGlass from '../../assets/looking-glass.svg'
import { Link } from 'react-router-dom'

export default function Lookup(props) {
    const [prevLocation, setPrevLocation] = useState(null)
    const [formData, setFormData] = useState("")
    const {selected, setSelected} = props.selectionHook
    const {pairs} = props
    useEffect(() => {
        setPrevLocation(() => {
            return JSON.parse(window.localStorage.getItem("DOBBER_LAST_DESTINATION_SPEC"))
        })
        
    }, [])
    // const checkIfPartOf = (array, shortest) => {
    //     const mutatedArray = []
    //     for (let i = 0; i < array.length; i++) {
    //         console.log(selected)
    //         if (!selected) {
    //             return
    //         }
    //         const current = array[i]
    //         if (current.slice(0, shortest.length).toUpperCase() === shortest.toUpperCase() && mutatedArray.length < 20){
    //             mutatedArray.push(
    //                 <Link className='dropdown-menu-pair' key={i} to={`/pair/${current}`}>{current}</Link>
    //             )
    //         }
            
    //     }
    //     return mutatedArray
    // }


    const handleChange = (e) => {
        setFormData(() => e.target.value)
    }
    return (
        <div className='lookup-content-wrapper' onMouseEnter={() => setSelected(true)} onMouseLeave={() => setSelected(false)}>
            <img className='looking-glass-img' src={lookingGlass} alt="" />
            <div className='input-dropdown-wrap'>
                <input className={selected ? "lookup-input lookup-input-hovered" : "lookup-input"} type="text"
                    value={formData} onChange={handleChange}/>
                {selected ? (<div className="search-nav">
                {
                pairs.filter(item => {
                    const searching = formData.toLowerCase()
                    const currentItem = item.toLowerCase()
                    return currentItem.startsWith(searching)
                }).map((item, index) => {
                    return <Link className='dropdown-menu-pair' key={index} to={`/pair/${item}`}>{item}</Link>
                })}
                </div>) : null}
            </div>
        </div>
    )
}