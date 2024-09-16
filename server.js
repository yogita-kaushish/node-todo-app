const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/taskRoutes')
const app = express();

app.use(express.json())
app.use('/tasks',routes)


// mongodb connection
const db = 'tasks-db'
const dbUri = `mongodb://localhost:27017/${db}`;

mongoose.connect(dbUri)

.then(()=>console.log('MongoDb connection successfull'))
.catch(err=>console.log('Error in MongoDb connection:',err))


app.listen(3001,()=>{
    console.log('Server running on port 3001')
})