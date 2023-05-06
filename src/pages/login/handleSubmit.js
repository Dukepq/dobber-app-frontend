export default async function handleSubmit(password) {
    const data = await fetch("http://localhost:5003/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password
        })
    })
    const jsonData = await data.json()
    return jsonData
}