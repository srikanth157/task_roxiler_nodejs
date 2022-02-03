
const express =require('express')
const fetch = require('node-fetch')

const app = express()

//get api from the third party api

app.get('/todos',async(req,res)=>{
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/todos')
        const resData = await data.json()
        resData.map((each)=>{     
             delete each['userId']     //removing userid from api data 
         })
         res.status(200).json({data:resData})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



//get api to fetch the data from both apis 

app.get('/users/:id',async (req,res)=>{
   try {
       const {id}=req.params

    const data=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`) 
    const resdata=await data.json()

    const dataTodos= await fetch('https://jsonplaceholder.typicode.com/todos')
    const todosData = await dataTodos.json()
    const filteredData =todosData.filter((each)=>{       //filtering the data 
         return each.userId==resdata.id
    })
    resdata['todos']=filteredData 
    res.status(200).json(resdata)
   } catch (error) {
       res.status(400).json({message:error.message})
       
   }
});




//server port 

app.listen(4000,()=>{
    console.log("server started at port 4000")
})
