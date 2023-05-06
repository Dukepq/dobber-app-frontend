import { useState, useEffect, useContext} from 'react'
import './assets/App.css'
import Navbar from './navbar'
import Screener from './pages/screener/screener'
import NotFound from './pages/404/404'
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import AuthRequired from './AuthRequired'
import Login from './pages/login/login'
import { UserContext } from './userContext'



function App() {
  const [data, setData] = useState([])
  const [key, setKey] = useState(() => {
    const item = window.localStorage.getItem('D_TOKEN_ID')
    return JSON.parse(item) || ""
  })
  const [auth, setAuth] = useState(() => true)
  // useEffect(() => {
  //   const stored = window.localStorage.getItem('D_TOKEN_ID')
  //   console.log(stored);
  //   if (stored !== null) {
  //     setKey(JSON.parse(stored))
  //   }
  // }, [])
  useEffect(() => {
    window.localStorage.setItem('D_TOKEN_ID', JSON.stringify(key))
  }, [key])

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
      {/* < Navbar /> */}
      <UserContext.Provider value={{key, setKey}}>
      <BrowserRouter>
        <Routes>
            <Route element={<AuthRequired auth={auth} setAuth={setAuth}/>}>
              <Route element={<Navbar />}>
                  <Route path='app' element={< Screener data = {data}/>}/>
              </Route>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path='login' element={<Login auth={auth} setAuth={setAuth}/>}/>
            
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
