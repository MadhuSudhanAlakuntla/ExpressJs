const mongoose = require("mongoose")
const express = require("express");
require("dotenv").config();
let app = express();
let port = process.env.PORT || 3000;
let url  = process.env.MONGODB_URL
app.use(express.json());


const dataSchema = mongoose.Schema({
    name: String,
    age : Number, 
})
const Data = mongoose.model("Data",dataSchema);

//Create data
app.post("/postData",(req,res)=>{
    const newData = new Data({...req.body})
    newData.save().then(()=>{
        console.log("Data saved successfully")
        res.send(newData);
        
    }
    ).catch(err => console.log("Error saving data",err));
})

//Get all data
app.get("/getData",(req,res)=>{
    Data.find().then(data => res.send(data));
})

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB", url);
})

// Connect to MongoDB
 app.listen(port,()=>{
    console.log(`listening on ${port}`);
 })