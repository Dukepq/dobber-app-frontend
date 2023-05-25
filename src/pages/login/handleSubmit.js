export default async function handleSubmit(password) {
    const data = await fetch("http://104.248.18.145/api/auth", {
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