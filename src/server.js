import express from "express"
import notify_route from "../src/routes/notify.route.js"
import client from "../redis/client.js";
import worker from "./worker/worker.js";

const app=express()
const PORT = 3000
app.use(express.json())




app.use("/",notify_route)

app.listen(PORT,()=>{
    console.log("Server is listening")
})

export default app