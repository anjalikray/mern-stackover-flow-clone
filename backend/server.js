import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import path from 'path'
import Router from './routers/index.js'

import Connection from './db.js';

const __dirname = path.resolve();

const PORT =  process.env.PORT || 8000;

const app = express();

//mongodb connection
Connection()


//middlewares
app.use(bodyParser.json({extended: true})); 
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())


// cors headers
// app.use((req , res , next) => {
//     res.header('Access-Control-Allow-Origin' , '*')
//     res.header('Access-Control-Allow-Headers' , '*')
//     next()
// })


//api
app.use('/api' , Router)




//static resources
// app.use('/upload' , express.static(path.join(__dirname , '/../uploads')))
// app.use(express.static(path.join(__dirname , '/../frontend/build')))

// app.get('*' , (req , res) => {
//     try{
//         res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
//     } catch(error) {
//         res.send('Oops....Error occurred')
//     } 
// })

//cors
app.use(cors())




app.listen(PORT , () => {
    console.log(`StackOverFlow-clone is running on port ${PORT}`);
});