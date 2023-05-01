import { useState, useEffect } from 'react'
import './assets/App.css'
import Navbar from './navbar'
import AnalyticsColumns from './AnalyticsColumns'
import sortingLogic from './utils/non-pure/sortingLogic'
import ExtraInfo from './components/extraInfo'

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
      let ROBSbTotal = 0
      let ROBSaTotal = 0
      let spreadTotal = 0
      let depthTotal = 0
      for (let i = 0; i < data.length; i++) {
        try {
          ROBSbTotal += data[i].ROBS.ROBSb
          ROBSaTotal += data[i].ROBS.ROBSb
          spreadTotal += data[i].depthData.data.spread
          depthTotal += data[i].depthData.data.depthRatio
          count++
        } catch (err) {
          console.log(err)
        }
      }
      const ROBSbAvg = ROBSbTotal / count
      const ROBSaAvg = ROBSaTotal / count
      const spreadAvg = spreadTotal / count
      const depthAvg = depthTotal / count
      setAverages(prev => {
        return {...prev, ROBSbAvg, ROBSaAvg, spreadAvg, depthAvg}
      })
    }
    return (
      <>
        <main className="main">
          <div className='data-wrapper'>
            <div className="description-col col">
                <div className='description-row description-row-1 row'>
                    <span onClick={() => setSorting(prev => ({field: "name", ascending: !prev.ascending}))}>Name</span>
                    <ExtraInfo textContent = {"The relevant pair"}/>
                    </div>
                <div className='description-row description-row-2 row'>
                    <span onClick={() => setSorting(prev => ({field: "exchange", ascending: !prev.ascending}))}>Exchange</span>
                    <ExtraInfo textContent = {"The exchange this pair is trading on."} />
                    </div>
                <div className='description-row description-row-3 row'>
                    <span onClick={() => setSorting(prev => ({field: "ROBSa", ascending: !prev.ascending}))}>ROBSa</span>
                    <ExtraInfo textContent = {"A measure of upward order book strength."} />
                    </div>
                <div className='description-row description-row-4 row'>
                    <span onClick={() => setSorting(prev => ({field: "ROBSb", ascending: !prev.ascending}))}>ROBSb</span>
                    <ExtraInfo textContent = {"A measure of downward order book strength."} />
                    </div>
                <div className='description-row description-row-5 row'>
                    <span onClick={() => setSorting(prev => ({field: "depth", ascending: !prev.ascending}))}>Depth ratio</span>
                    <ExtraInfo textContent = {"The ratio of bids and asks."} />
                    </div>
                <div className='description-row description-row-6 row'>
                    <span onClick={() => setSorting((prev) => {
                  // console.log('prev state ' + prev.field, prev.ascending)
                  return {field: "spread", ascending: !prev.ascending}
                })}>Spread</span>
                    <ExtraInfo textContent = {"The percent difference between the best ask and best bid."} />
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
              />
            })}
          </div>
        </main>
      </>
    )
  }