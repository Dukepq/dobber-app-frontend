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
import { ThemeContext } from './useTheme'
import { address } from './address'

function App() {
  const [data, setData] = useState([])
  const [sorting, setSorting] = useState({field: "", ascending: false})
  const [key, setKey] = useState(() => {
    const item = window.localStorage.getItem('D_TOKEN_ID')
    return JSON.parse(item) || ""
  })
  const {theme} = useContext(ThemeContext)
  const [pairs, setPairs] = useState(() => [])
  const [auth, setAuth] = useState(() => true)
  const [dataObject, setDataObject] = useState(() => {})
  const [userSelection, setUserSelection] = useState(() => {
    const item = JSON.parse(window.localStorage.getItem("DOBBER_USER_PREFERRED_SELECTION#981")) || []
    return item
})
  useEffect(() => {
    window.localStorage.setItem('D_TOKEN_ID', JSON.stringify(key))
  }, [key])
  useEffect(() => {

    fetch(`${address}/api/v1/data`, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": key.length.toString(),
        "X-Token": key.toString()
      },
      method: "GET"
    })
        .then(res => res.json())
        .then(data => {
          setDataObject(() => structuredClone(data.data))
          const ObjPairs = Object.keys(data.data)
          const array = ObjPairs.map(key => data.data[key])
          
          setPairs(() => ObjPairs)
          setData(() => array)
        })
        .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${address}/api/v1/data`, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": key.length.toString(),
          "X-Token": key.toString()
        },
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          setDataObject(() => structuredClone(data.data))
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
    <div id={theme}>
      <UserContext.Provider value={{key, setKey}}>
      <BrowserRouter>
        <Routes>
            <Route element={<AuthRequired auth={auth} setAuth={setAuth}/>}>
              <Route element={<Navbar />}>
                <Route path='home' element={< Homepage
                dataObject = {dataObject} pairs = {pairs} data = {data} userSelectionHooks = {{userSelection, setUserSelection}}
                />}/>
                <Route path='docs' element={< Docs />} />
                  <Route path='app' element={< Screener data = {data} userSelectionHook = {{userSelection, setUserSelection}} sortingHook = {{sorting, setSorting}} dataObject = {dataObject} pairs = {pairs}/>}/>
                    <Route path="pair" element={<Pair pairs = {pairs} data = {data} dataObject = {dataObject}/>}>
                      <Route path=":pair" element={< Content data = {data} dataObject = {dataObject}/>}/>
                    </Route>
              </Route>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path='login' element={<Login auth={auth} setAuth={setAuth}/>}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
