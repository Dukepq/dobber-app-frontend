import { useContext } from "react"
import { ThemeContext } from "../useTheme"
import eyeImage from "../assets/eye-solid.svg"
import emptyStarImage from "../assets/star-regular.svg"
import filledStarImage from "../assets/star-solid.svg"

export default function Favorite(props) {
    const pair = props.pair
    const {theme} = useContext(ThemeContext)
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
        <img className="watching-toggle-image" onClick={handleClick} src={userSelection.includes(pair) ? filledStarImage : emptyStarImage} alt="add favorite"
        style = {userSelection.includes(pair) ? (theme === "light" ? {filter:"invert(8%) sepia(100%) saturate(7184%) hue-rotate(248deg) brightness(96%) contrast(143%)", opacity: 0.5} : {filter: "invert(1)", opacity: 1}) :
        (theme === "dark" ? {filter: "invert(1)", opacity: 0.5} : {filter: "invert(8%) sepia(100%) saturate(7184%) hue-rotate(248deg) brightness(96%) contrast(143%)", opacity: 0.25})}
        />
    )
}