const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
const uri = 'mongodb+srv://shaggy:shaggy@cluster0-kqb9r.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// initialize routes
app.use('/api',routes);

// error handling middleware
app.use((err,req,res,next)=>{
    res.status(422).send({error: err.message});
})

// listen for requests
port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server started on port ${ port }...`);
})