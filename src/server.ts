import express from "express"

const app = express()

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.listen(3000, () => {
    console.log("Server is running no port localhost:3000")
})