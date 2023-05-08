import "./404.css"
import {Link} from "react-router-dom"

export default function NotFound() {
    return (
        <div className="err-wrapper">
            <div className="err-content">
                <h1 className="err">Oops! We couldn't find that page.</h1>
                <p className="err-suggested">Maybe you can find what you're looking for here:</p>
                <div className="err-links">
                    <Link to="/home">Homepage</Link>
                    <Link to="/app">Screener</Link>
                    <Link to="/docs">Docs</Link>
                    <Link to="/pair">Search</Link>
                </div>
            </div>
        </div>
    )
}