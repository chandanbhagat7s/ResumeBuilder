const express = require("express")


const env = require("dotenv")
const { default: mongoose } = require("mongoose")
const globalerrorHandler = require("./utils/globalerrorHandler")
const userRouter = require("./Routes/userRoutes")
const resumeRouter = require("./Routes/resumeRoutes")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
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


app.use(express.static(`${__dirname}/Public`))

// to get all everything 
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/resume', resumeRouter)



app.use(globalerrorHandler)

app.listen(PORT, () => {
    console.log("server started at PORT", PORT);
})



































