const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbconfig');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data.routes')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

const PORT = 3002;

app.get('/',(req,res)=>{
    res.send('Hello we are at Home-Page of WiJungle');    
})

app.use('/api/',dataRoutes);

mongoose.connection.once('open',()=>{
    console.log('Connected to DB')
    app.listen(process.env.PORT || PORT , ()=>{
        console.log(`Server is Up on ${PORT} and Running`);
    })
})