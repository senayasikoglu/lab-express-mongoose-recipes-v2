const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res ) => {

    const {title, level, ingredients, cuisine, duration, instructions} = req.body;

    Recipe.create({title, level, ingredients, cuisine, duration, instructions} )
        .then((Createdrecipe) => {
           res.status(201).json(Createdrecipe);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error:error});

        });
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res ) => {

    Recipe.find()
        .then( (allRecipes) => {
            res.status(200).json(allRecipes);
        })
        .catch( (e) => {
            console.log("Error while getting all recipes");
            console.log(e)
            res.status(500).json({message: "Error while getting all recipes"})
        });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


app.get("/recipes/:id", (req, res ) => {
    

    Recipe.findById(req.params.id)
        .then( (recipe) => {
            res.status(200).json(recipe);
        })
        .catch( (e) => {
            console.log("Error while getting a recipe");
            console.log(e)
            res.status(500).json({message: "Error while getting a recipe"})
        });
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


app.put("/recipes/:id", (req, res ) => {
    

    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then( (updatedRecipe) => {
            res.status(200).json(updatedRecipe);
        })
        .catch( (e) => {
            console.log("Error while updating a recipe");
            console.log(e)
            res.status(500).json({message: "Error while updating a recipe"})
        });
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route


app.delete("/recipes/:id", (req, res ) => {
    

    Recipe.findByIdAndDelete(req.params.id)
        .then( () => {
            res.status(204).send();
        })
        .catch( (e) => {
            console.log("Error while deleting a recipe");
            console.log(e)
            res.status(500).json({message: "Error while deleting a recipe"})
        });
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
