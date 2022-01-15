require("dotenv").config()
const express= require ("express")
const cors=require("cors")
const app=express()
const bankRouter = require ('./routes/routes')

app.use(cors());
app.use(express.json());
app.use("/api", bankRouter);



app.listen(process.env.PORT, ()=>{
    console.log("server is up")
})


