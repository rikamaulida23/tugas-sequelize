const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin : "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db=  require("./app/models");
db.sequelize.sync()
.then(()=> {
    console.log('Synced db');
})
.catch((err) => {
    console.log('Failed to sync db: ', err.message);
});

//import book controller 
const bookController = require('./app/controllers/book.controllers');

// create book route
app.post("/", (req,res) => {
    console.log('>> create book api');
    bookController.create(req, res);
});

// find all book route
app.get("/", (req,res) => {
    bookController.findAll(req, res);
});

// find all book by id route
app.get("/:id", (req,res) => {
    bookController.findOne(req, res);
});

// delete book by id route
app.delete("/:id", (req,res) => {
    bookController.delete(req, res);
});

// update book with id route
app.put("/:id", (req,res) => {
    bookController.update(req, res);
});

// update book with id route
app.patch("/:id", (req,res) => {
    bookController.patch(req, res);
});


//set port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `)
});