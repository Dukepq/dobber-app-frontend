import { useState } from "react"
import eyeImage from "../assets/eye-solid.svg"

export default function Favorite(props) {
    const pair = props.pair
    const {userSelection, setUserSelection} = props.userSelectionHook
    const handleClick = () => {
        const storedArray = JSON.parse(window.localStorage.getItem("DOBBER_USER_PREFERRED_SELECTION#981"))
        if (!storedArray || storedArray.length === 0) {
            const array = [pair]
            window.localStorage.setItem("DOBBER_USER_PREFERRED_SELECTION#981", JSON.stringify(array))
            setUserSelection(() => array)
            return
        } else {
            const index = storedArray.indexOf(pair)
            if (-1 >= index) {
                storedArray.push(pair)
                window.localStorage.setItem("DOBBER_USER_PREFERRED_SELECTION#981", JSON.stringify(storedArray))
                setUserSelection(() => storedArray)
                return
            }
            storedArray.splice(index, 1)
            window.localStorage.setItem("DOBBER_USER_PREFERRED_SELECTION#981", JSON.stringify(storedArray))
            setUserSelection(() => storedArray)
        }
    }
    return (
        <img className="watching-toggle-image" onClick={handleClick} src={eyeImage} alt="add favorite"
        style = {userSelection.includes(pair) ? {opacity: 0.9, filter: "invert(1)"} : {}}
        />
    )
}