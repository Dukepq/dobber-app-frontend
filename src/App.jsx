import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './navbar'
import Screener from './screener'
 

function App() {
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
          setData(() => array)
        })
        .catch(err => console.log(err))
    }, 6000)
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
  }, [data])

  return (
    <>
      < Navbar />
      < Screener data = {data}/>
    </>
  )
}

export default App
