const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || "mongodb+srv://yashwanth:yashwanth@mycluster-uenie.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(
//     'mongodb+srv://yashwanth:yashwanth@mycluster-uenie.mongodb.net/test?retryWrites=true&w=majority',
//     {useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true}
//     )
//     .then(() => {console.log("Connected to MangoDB")
// })
// .catch(err => { 
//     console.log(err);
//     console.log("Connection failed!!");
// });
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {console.log("MangoDB connection connected successfully");});

const exercisesRouter = require('./models/routes/exercises');
const usersRouter = require('./models/routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port, () => {console.log(`Server is running on port: ${port}`);});
