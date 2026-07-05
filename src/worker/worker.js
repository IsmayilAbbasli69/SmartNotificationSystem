import client from "../../redis/client.js";
import notifyService from "../services/notify.service.js";
async function workerStart(){

while(true){

    try{
const not= await client.blPop("notify__job",4)
if(!not) continue

console.log("Processing",not)
const job=JSON.parse(not.element);
await client.set(
    job.email,
    JSON.stringify(job)
)
console.log("Data cached")

    }catch(err){
        console.log(err)
    }
}

}


export default workerStart()