const express = require("express")


const env = require("dotenv")
const { default: mongoose } = require("mongoose")
const app = express()

// access to env.variable

// starting the server 
env.config({ path: "./config.env" })
const PORT = process.env.PORT

// making DB connection 
mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then((con) => {
        // console.log(con.connection);
        console.log("database connected");
    }).catch(e => {
        console.log("not connected");
    })


// app.use('/api/v1/user')

app.listen(PORT, () => {
    console.log("server started at PORT", PORT);
})



































