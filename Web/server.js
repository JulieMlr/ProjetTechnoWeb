const express=require('express')
const cors=require('cors')
const app=express()
const bodyParser = require("body-parser");


const connectDB=require('./config/connectDB')

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

//connectDB (config)
connectDB()


//routes
app.use("/course",require('./routes/course'))
app.use("/utilisateur",require('./routes/utilisateur'))
app.use("/administrateur",require('./routes/administrateur'))

//run server
const port=process.env.PORT||5000
app.listen(port,err=>err?console.log(err):console.log(`connected on port ${port}`))
