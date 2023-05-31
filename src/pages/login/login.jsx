import { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../userContext"
import handleSubmit from "./handleSubmit"
import "../../assets/form.css"
export default function Login(props) {
    const {auth, setAuth} = props
    const [formData, setFormData] = useState("")
    const {key, setKey} = useContext(UserContext)
    const updateFormData = (e) => {
        setFormData(() => e.target.value)
    }
    const submit = async() => {
        console.log(formData)
        const data = await handleSubmit(formData)
        if (data.success) {
            setKey(() => data.token)
            setAuth(() => true)
            window.location.href = "/app" // causes loss of state
        }
        setFormData(() => "")
    }
    //  useEffect(() => {
    //     console.log("key: ", {key})
    //     fetch("http://localhost:5003/val", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         token: key
    //     })
    // })
    // .then(res => res.json())
    // .then(data => {
    //     if (data.success) {
    //         setAuth(() => true)
    //     } else {
    //         setAuth(() => false)
    //     }
    // })
    // }, [key])
    // if (auth) return <Navigate to="/app" />
    return (
    <div className="container">
        <div className="wrapper">
            <p className="disclaimer">DISCLAIMER</p>
            <p>Nothing on Dobber should be interpreted as financial advice. Dobber is a simple analytics tool that is in
                early development and is currently not intended for widespread use.</p>
            <p>By using Dobber you acknowledge the following:</p>
            <ol>
                <li>Dobber does <span className="not">not</span> provide you with financial advice, your decisions are  your own.</li>
                <li>Dobber is very early in development, bugs and other issues are to be expected.
                    The current build is experimental.
                </li>
            </ol>
            <div className="input-form">
                <input onChange={(e) => updateFormData(e)} onKeyDown={(e) => e.key === "Enter" && submit()}
                className="form-input" id="password-form" name="password-form" type="password"
                value={formData} placeholder="password"></input>
                <button onClick={submit} id="submit-button">{"ENTER"}</button>
            </div>
            <label className="password">Contact the admin of this page for information regarding early access.</label>
        </div>
    </div>
    )
}