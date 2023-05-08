import { useState, useEffect, useContext } from 'react'
import '../../assets/App.css'
import AnalyticsColumns from './AnalyticsColumns'
import sortingLogic from '../../utils/non-pure/sortingLogic'
import ExtraInfo from '../../components/extraInfo'
import TopScreenerSection from './topScreenerSection'
import Navbar from '../../navbar'
import { UserContext } from '../../userContext'

export default function Screener(props) {
    const [sorting, setSorting] = useState({field: "", ascending: false})
    const [data, setData] = useState(props.data)
    const [averages, setAverages] = useState({ROBSbAvg: 0, ROBSaAvg: 0, spreadAvg: 0, depthAvg: 0})
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
        // if (data[i].ROBS?.ROBSb && data[i].ROBS?.ROBSb && data[i].depthData?.data?.spread && data[i].depthData?.data?.depthRatio) {
        //   try {
        //     ROBSbTotal.push(data[i].ROBS.ROBSb)
        //     ROBSaTotal.push(data[i].ROBS.ROBSb)
        //     spreadTotal.push(data[i].depthData.data.spread)
        //     depthTotal.push(data[i].depthData.data.depthRatio)
        //     count++
        //   } catch (err) {
        //     console.log(err)
        //   }
        // }
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
                    <span onClick={() => setSorting(prev => ({field: "name", ascending: !prev.ascending}))}>Name</span>
                    <ExtraInfo textContent = {"The relevant pair"}/>
                    </div>
                <div className='description-col description-col-2 col'>
                    <span onClick={() => setSorting(prev => ({field: "exchange", ascending: !prev.ascending}))}>Exchange</span>
                    <ExtraInfo textContent = {"The exchange this pair is trading on."} />
                    </div>
                <div className='description-col description-col-3 col'>
                    <span onClick={() => setSorting(prev => ({field: "ROBSa", ascending: !prev.ascending}))}>ROBSa</span>
                    <ExtraInfo textContent = {"A measure of upward order book strength."} />
                    </div>
                <div className='description-col description-col-4 col'>
                    <span onClick={() => setSorting(prev => ({field: "ROBSb", ascending: !prev.ascending}))}>ROBSb</span>
                    <ExtraInfo textContent = {"A measure of downward order book strength."} />
                    </div>
                <div className='description-col description-col-5 col'>
                    <span onClick={() => setSorting(prev => ({field: "depth", ascending: !prev.ascending}))}>Depth ratio</span>
                    <ExtraInfo textContent = {"The ratio of bids and asks."} />
                    </div>
                <div className='description-col description-col-6 col'>
                    <span onClick={() => setSorting((prev) => {
                  // console.log('prev state ' + prev.field, prev.ascending)
                  return {field: "spread", ascending: !prev.ascending}
                })}>Spread</span>
                    <ExtraInfo textContent = {"The percent difference between the best ask and best bid."} />
                </div>
                <div className='description-col description-col-7 col'>
                  <span onClick={() => setSorting(prev => ({field: "volume", ascending: !prev.ascending}))}>Recent volume</span>
                  <ExtraInfo textContent = {"Shows you recent average volume (€/min)"} />
                </div>
            </div>
            {data?.map((obj, index) => {
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
              />
            })}
          </div>
        </main>
      </>
    )
  }