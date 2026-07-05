import client from "../../redis/client.js"

class Notify{
    
    async  notify(data){
        const newData={
            user:data.user,
            email:data.email,
            message:data.message
        }

        
        await client.rPush("notify__job",JSON.stringify(newData))
        console.log("status","queued")
        return {status:"queues",data:newData}

    }  

    async getUser(data){
try{
        const user= await client.get(data)
        if(user){
        console.log("user found");
        
        return JSON.parse(user)
            
        }else{
            return "Problem occured"
        }

}catch(err){
    console.log(err)
}
    }

 
  
}


/*

{
  "user": "Elvin",
  "email": "elvin@example.com",
  "message": "Sifarişiniz təsdiqləndi"
}


reponse-----{ "status": "queued" }



*/

export  default new Notify()