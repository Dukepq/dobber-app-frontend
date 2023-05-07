import { Outlet, Navigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "./userContext"

export default function AuthRequired(props) {
    const {key, setKey} = useContext(UserContext)
    const {auth, setAuth} = props
    useEffect(() => {

            fetch("http://localhost:5003/val", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: key
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setAuth(() => true)
            } else {
                setAuth(() => false)
            }
        })
        
        
    }, [])
    if (auth) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }

}