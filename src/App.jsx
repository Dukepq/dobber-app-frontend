import { useState, useEffect, useContext} from 'react'
import './assets/App.css'
import Navbar from './navbar'
import Screener from './pages/screener/screener'
import NotFound from './pages/404/404'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRequired from './AuthRequired'
import Login from './pages/login/login'
import { UserContext } from './userContext'
import Pair from './pages/pair/pair'
import Content from './pages/pair/content'
import {default as extremes} from './extremesDef'
import Homepage from './pages/homepage/homepage'
import Docs from './pages/docs/docs'
import { ThemeProvider } from './useTheme'


function App() {
  const [data, setData] = useState([])
  const [key, setKey] = useState(() => {
    const item = window.localStorage.getItem('D_TOKEN_ID')
    return JSON.parse(item) || ""
  })
  const [pairs, setPairs] = useState(() => [])
  const [auth, setAuth] = useState(() => true)
  const [dataObject, setDataObject] = useState(() => {})
  const [userSelection, setUserSelection] = useState(() => {
    const item = JSON.parse(window.localStorage.getItem("DOBBER_USER_PREFERRED_SELECTION#981")) || []
    console.log(typeof([item][0]))
    return item
})
  useEffect(() => {
    window.localStorage.setItem('D_TOKEN_ID', JSON.stringify(key))
  }, [key])
  useEffect(() => {
    fetch('http://localhost:5003/api/v1/data')
        .then(res => res.json())
        .then(data => {
          setDataObject(() => data.data)
          const ObjPairs = Object.keys(data.data)
          const array = ObjPairs.map(key => data.data[key])
          
          setPairs(() => ObjPairs)
          setData(() => array)
        })
        .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5003/api/v1/data')
        .then(res => res.json())
        .then(data => {
          setDataObject(() => data.data)
          const ObjPairs = Object.keys(data.data)
          const array = ObjPairs.map(key => data.data[key])
          
          setPairs(() => ObjPairs)
          setData(() => array)
          
        })
        .catch(err => console.log(err))
    }, 6000)
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
  }, []) //--data
  return (
    <>
      <UserContext.Provider value={{key, setKey}}>
      <ThemeProvider>
      <BrowserRouter>
        <Routes>
            <Route element={<AuthRequired auth={auth} setAuth={setAuth}/>}>
              <Route element={<Navbar />}>
                <Route path='home' element={< Homepage
                dataObject = {dataObject} pairs = {pairs} data = {data} userSelectionHooks = {{userSelection, setUserSelection}}
                />}/>
                <Route path='docs' element={< Docs />} />
                  <Route path='app' element={< Screener data = {data}/>}/>
                    <Route path="pair" element={<Pair pairs = {pairs} data = {data} dataObject = {dataObject}/>}>
                      <Route path=":pair" element={< Content data = {data} dataObject = {dataObject}/>}/>
                    </Route>
              </Route>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path='login' element={<Login auth={auth} setAuth={setAuth}/>}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </UserContext.Provider>
    </>
  )
}

export default App
