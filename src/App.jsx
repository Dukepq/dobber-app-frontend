import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './navbar'
import AnalyticsColumns from './AnalyticsColumns'
import {sortBySpread, sortByROBSa, sortByROBSb, sortByDepthRatio} from './sortingFuncs.js'


function App() {
  const [sorting, setSorting] = useState({field: "", ascending: false})
  const [data, setData] = useState([])
  useEffect(() => {
    console.log('initial useEffect ran')
    fetch('http://localhost:5003/api/v1/data')
        .then(res => res.json())
        .then(data => {
          const array = Object.keys(data.data).map(key => data.data[key])
          setData((prev) => array)
        })
        .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5003/api/v1/data')
        .then(res => res.json())
        .then(data => {
          const array = Object.keys(data.data).map(key => data.data[key])
          setData((prev) => {
            const sortedArray = sortingLogic(sorting, array)
            console.log(sorting)
            console.log(sortedArray)
            return sortedArray
          })
        })
        .catch(err => console.log(err))
    }, 3000)
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
  }, [data])
  const applySorting = (key, ascending) => {
    setSorting(() => {field: key, ascending})
  }

  useEffect(() => {
    console.log('!!!')
    try {
      const array = [...data]
      const sortedArray = sortingLogic(sorting, array)
      setData(prev => sortedArray)
    } catch (err) {
      console.log(err)
    }
  }, [sorting])
  // add cases to this when you add rows containing different data
  const sortingLogic = (sorting, array) => {
    let sortedArray
    if (!sorting.field) return array
    switch (sorting.field) {
      case "spread":
        sortedArray = sortBySpread(array)
        break
      case "depth":
        sortedArray = sortByDepthRatio(array)
        break
      case "ROBSa":
        sortedArray = sortByROBSa(array)
        break
      case "ROBSb":
        sortedArray = sortByROBSb(array)
        break
      case "exchange":
        sortedArray = array
        break
      case "name":
        sortedArray = array
        break
    }
    return sorting.ascending ? sortedArray : sortedArray.reverse()
  }

  return (
    <>
      < Navbar />
      <main className="main">
        <div className='data-wrapper'>
          <div className="description-col col">
              <div className='description-row description-row-1 row'><span onClick={() => setSorting(prev => ({field: "name", ascending: !prev.ascending}))}>Name</span></div>
              <div className='description-row description-row-2 row'><span onClick={() => setSorting(prev => ({field: "exchange", ascending: !prev.ascending}))}>Exchange</span></div>
              <div className='description-row description-row-3 row'><span onClick={() => setSorting(prev => ({field: "ROBSa", ascending: !prev.ascending}))}>ROBSa</span></div>
              <div className='description-row description-row-4 row'><span onClick={() => setSorting(prev => ({field: "ROBSb", ascending: !prev.ascending}))}>ROBSb</span></div>
              <div className='description-row description-row-5 row'><span onClick={() => setSorting(prev => ({field: "depth", ascending: !prev.ascending}))}>Depth ratio</span></div>
              <div className='description-row description-row-6 row'><span onClick={() => setSorting((prev) => {
                // console.log('prev state ' + prev.field, prev.ascending)
                return {field: "spread", ascending: !prev.ascending}
              })}>Spread</span></div>
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
            />
          })}
        </div>
      </main>
    </>
  )
}

export default App
