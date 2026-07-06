import { createClient } from "redis";

const client=createClient({
    url:"redis://localhost:6379"
})

client.on("error",(err)=>{
    console.error(err)
})

async function connectRedis(){
    try{
    if(!client.isOpen){
        await client.connect()
        console.log("Redis connected")
    }
}catch(err){
    console.log
}
}

connectRedis()

export default client

