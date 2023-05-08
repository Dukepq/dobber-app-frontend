import { useState, useEffect } from "react"
import HomePair from "./homePairComp"
import "./home.css"

export default function Homepage(props) {
    const {pairs, dataObject, data} = props
    const {userSelection, setUserSelection} = props.userSelectionHooks
    return(
        <>
        <div className="home-page-wrapper">
            <div className="home-page-header">
                <p>header here</p>
                <button onClick={() => {
                    setUserSelection(() => [])
                    window.localStorage.removeItem("DOBBER_USER_PREFERRED_SELECTION#981")
                }}>clear favourites</button>
            </div>
            {userSelection.length > 0 ? (
                <div className="homepage-content homepage-user-specific-content">
                {userSelection.map((item, index) => {
                    return <HomePair
                    key = {index}
                    data = {dataObject?.[item]}
                    userSelectionHook = {{userSelection, setUserSelection}}
                    />
                })}
            </div>
            ) : (
                <div className="homepage-userselected-placeholder">Once you add some favourites, they will show up here</div>
            )}
            
            {userSelection?.length > 0 && <div className="homepage-content-break"></div>}

            <div className="homepage-content">
                {data.filter((item, index) => {
                    return (item?.volumeData?.averageVolume * item?.depthData?.data?.price) > 100
                }).map((item, index) => {
                    if (index < 21) {
                        return (
                            < HomePair
                            key = {index}
                            data = {item}
                            userSelectionHook = {{userSelection, setUserSelection}}
                            />
                        )
                    }
                    
                })
                }
            </div>
        </div>
        <footer className="homepage-footer">
            <p>footer here</p>
        </footer>
        </>
    )
}