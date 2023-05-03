import "./404.css"

export default function NotFound() {
    return (
        <div class="wrapper">
            <div class="content">
                <h1 class="err">Oops! We couldn't find that page.</h1>
                <p class="suggested">Maybe you can find what you're looking for here:</p>
                <div class="links">
                    <a href="#">Homepage</a>
                    <a href="#">Dobber app</a>
                </div>
            </div>
        </div>
    )
}