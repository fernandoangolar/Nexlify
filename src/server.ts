import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get("/health", (request, response) => {
    return response.send("API funcionando")
})

app.listen(port, 
    () => console.log(`Server is running on port ${port}`) 
)