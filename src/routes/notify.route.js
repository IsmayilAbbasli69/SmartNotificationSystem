import express from "express"
import notifyService from "../services/notify.service.js"
const route = express.Router()


route.post('/notify', async (req,res)=>{
   const newnotify=await notifyService.notify(req.body)

   res.status(201).json(newnotify)
})


route.get('/notify/:email',async (req,res)=>{
    const user=await notifyService.getUser(req.params.email)

    res.json(user)
})

export default route