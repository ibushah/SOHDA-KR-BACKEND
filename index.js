const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adRoutes=require("./routes/AdRoutes");

const app = express();

mongoose.connect('mongodb://localhost/SodhaKarDB',{useNewUrlParser:true})
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// Setting the routes in the app
app.use("/api/user", userRoutes);
app.use("/api/ad", adRoutes);


// For Error Handleing
app.use((err, req, res, next) => res.send({ error: err.message }))



// Start Listening to requests
app.listen(4000, () => {
    console.log("**Listening**");
});
