const express = require("express");
const logger = require("morgan");

const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose=require("mongoose");
const Receipe = require("./models/Receipe.model");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose.connect(MONGODB_URI)
.then((res)=>{console.log('connected to mongo')})
.catch((err)=>{console.error('error connecting to mongo',err)})



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});



//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/receipes',(req,res)=>{
    console.log("Full body:", req.body);
  console.log("Instructions:", req.body.instructions);
    Receipe.create({
        title:req.body.title,
        instructions:req.body.instructions,
        level:req.body.level,
        ingredients:req.body.ingredients,
        image:req.body.image,
        duration:req.body.duration,
        isArcheived:req.body.isArcheived,
        created:req.body.created
    })
    .then((createdReceipe)=>{
        res.status(201).json(createdReceipe)
    })
    .catch((err)=>{
          console.error(err.message);
        res.status(500).json({message:'error while creating new receipe'})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/receipes',(req,res)=>{
    Receipe.find()
    .then((allReceipes)=>
    {
        res.status(200).json(allReceipes)
    })
    .catch((err)=>{

        res.status(500).json({message:'error while getting all receipes'})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/receipes/:id',(req,res)=>{
    Receipe.findById(req.params.id)
    .then((receipe)=>
    {
        res.status(200).json(receipe)
    })
    .catch((err)=>{

        res.status(500).json({message:'error while getting all receipes'})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/receipes/:id',(req,res)=>{
    Receipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedReceipe)=>
    {
        console.log(updatedReceipe)
        res.status(200).json(updatedReceipe)
    })
    .catch((err)=>{

        res.status(500).json({message:'error while updating single receipe'})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/receipes/:id',(req,res)=>{
    Receipe.findByIdAndDelete(req.params.id)
    .then(()=>
    {
        
        res.status(204).send()
    })
    .catch((err)=>{

        res.status(500).json({message:'error while deleting single receipe'})
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
