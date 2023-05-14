import { useState, useEffect, useContext } from 'react'
import '../../assets/App.css'
import AnalyticsColumns from './AnalyticsColumns'
import sortingLogic from '../../utils/non-pure/sortingLogic'
import ExtraInfo from '../../components/extraInfo'
import TopScreenerSection from './topScreenerSection'
import Navbar from '../../navbar'
import { UserContext } from '../../userContext'



export default function Screener(props) {
    const {sorting, setSorting} = props.sortingHook
    const [data, setData] = useState(props.data)
    const [filteredData, setFilteredData] = useState([])
    const [averages, setAverages] = useState({ROBSbAvg: 0, ROBSaAvg: 0, spreadAvg: 0, depthAvg: 0})
    const {userSelection, setUserSelection} = props.userSelectionHook
    const {dataObject, pairs} = props
    const [formData, setFormData] = useState("")
    const handleChange = (e) => {
      setFormData(() => e.target.value)
    }
    useEffect(() => {
      setFilteredData(() => {
        return data?.filter((item) => {
          const searching = formData?.toLowerCase()
          const currentItem = item.depthData.pair.toLowerCase()
          return currentItem.startsWith(searching)
        })
      })
    }, [formData])
    useEffect(() => {
        calcAverages(props.data)
        setData(prev => {
            const sortedArray = sortingLogic(sorting, props.data)
            return sortedArray
        })

    }, [props.data])
    useEffect(() => {
      try {
        calcAverages(data)
        const array = [...data]
        const sortedArray = sortingLogic(sorting, array)
        setData(prev => sortedArray)
        if (formData.length > 0) {
          setFilteredData(() => {
            return data.filter((item) => {
              const searching = formData?.toLowerCase()
              const currentItem = item.depthData.pair.toLowerCase()
              return currentItem.startsWith(searching)
            })
          })
        }
      } catch (err) {
        console.log(err)
      }
    }, [sorting])
    const calcAverages = (data) => {
      if (!data || (data.length < 1)) return
      let count = 0
      let ROBSbTotal = []
      let ROBSaTotal = []
      let spreadTotal = []
      let depthTotal = []
      for (let i = 0; i < data.length; i++) {
        data[i].ROBS?.ROBSb && ROBSbTotal.push(data[i].ROBS.ROBSb)
        data[i].ROBS?.ROBSb && ROBSaTotal.push(data[i].ROBS.ROBSb)
        data[i].depthData?.data?.spread && (spreadTotal.push(data[i].depthData.data.spread))
        data[i].depthData?.data?.depthRatio && (depthTotal.push(data[i].depthData.data.depthRatio) && count++)
      }
      ROBSbTotal.sort()
      ROBSaTotal.sort()
      spreadTotal.sort()
      depthTotal.sort()
      
      const ROBSbAvg = ROBSbTotal[Math.round(ROBSbTotal.length/2)]
      const ROBSaAvg = ROBSaTotal[Math.round(ROBSaTotal.length/2)]
      const spreadAvg = spreadTotal[Math.round(spreadTotal.length/2)]
      const depthAvg = depthTotal[Math.round(depthTotal.length/2)]
      setAverages(prev => {
        return {...prev, ROBSbAvg, ROBSaAvg, spreadAvg, depthAvg}
      })
    }
    return (
      <>
        {/* <Navbar /> */}
        <TopScreenerSection data = {data}/>
        <main className="main">
          <div className='data-wrapper'>
            <div className="description-row row">
                <div className='description-col description-col-1 col'>
                  <ExtraInfo textContent = {"The full pair name consisting of the base and quote."}/>
                    <span onClick={() => setSorting(prev => ({field: "name", ascending: !prev.ascending}))}>Name</span>
                    <form><input className='screener-input-field' onChange={handleChange} value={formData} type="text" /></form>
                    </div>
                <div className='description-col description-col-2 col'>
                    <ExtraInfo textContent = {"The exchange this pair is trading on."} />
                    <span onClick={() => setSorting(prev => ({field: "exchange", ascending: !prev.ascending}))}>Exchange</span>
                    </div>
                <div className='description-col description-col-3 col'>
                    <ExtraInfo textContent = {"A measure of upward order book strength."} />
                    <span onClick={() => setSorting(prev => ({field: "ROBSa", ascending: !prev.ascending}))}>ROBSa</span>
                    </div>
                <div className='description-col description-col-4 col'>
                    <ExtraInfo textContent = {"A measure of downward order book strength."} />
                    <span onClick={() => setSorting(prev => ({field: "ROBSb", ascending: !prev.ascending}))}>ROBSb</span>
                    </div>
                <div className='description-col description-col-5 col'>
                    <ExtraInfo textContent = {"The average difference of lows and highs taken for the past 6 candles with period of 1m in percentages."} />
                    <span onClick={() => setSorting(prev => ({field: "volatilityIndex", ascending: !prev.ascending}))}>Volatility index</span>
                    </div>
                <div className='description-col description-col-6 col'>
                    <ExtraInfo textContent = {"The percent difference between the best ask and best bid."} />
                    <span onClick={() => setSorting((prev) => {
                  // console.log('prev state ' + prev.field, prev.ascending)
                  return {field: "spread", ascending: !prev.ascending}
                })}>Spread</span>
                </div>
                <div className='description-col description-col-7 col'>
                  <ExtraInfo textContent = {"Shows you recent average volume (€/min)"} />
                  <span onClick={() => setSorting(prev => ({field: "volume", ascending: !prev.ascending}))}>Recent volume</span>
                </div>
            </div>
            <div className='screener-data-content'>
            {(formData.length > 0 ? filteredData : data)?.map((obj, index) => {
              return < AnalyticsColumns
                key = {index}
                id = {index}
                name = {obj?.depthData?.pair}
                exchange = {obj?.depthData?.exchange}
                ROBSa = {obj?.ROBS?.ROBSa}
                ROBSb = {obj?.ROBS?.ROBSb}
                depthRatio = {obj?.depthData?.data?.depthRatio}
                volumeData = {obj?.volumeData?.averageVolume * obj?.depthData?.data?.price ? obj?.volumeData?.averageVolume * obj?.depthData?.data?.price : null}
                spread = {obj?.depthData?.data?.spread}
                averages = {averages}
                price = {obj?.depthData?.data?.price}
                volatilityIndex = {(obj?.volumeData?.volatilityArray?.reduce((acc, cur) => acc + cur) / 6) * 100}
                userSelectionHook = {{userSelection, setUserSelection}}
              />
            })}
            </div>
          </div>
        </main>
      </>
    )
  }