const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

// ROUTES
const userRouter = require("./routes/userRouter")
const categoryRouter = require("./routes/categoryRouter")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
// app.use(cors({
//     origin: ["http:localhost:5173", "jumia.com"],
//     methods: ["GET", "POST"]
// }))

const productRouter = require("./routes/productRouter")
const authRouter = require("./routes/authRouter")
const errorHandler = require("./middlewares/errorHandler")

require("./config/connectToDb")
require("./services/nodemailer/transporter")

// listen to port
app.listen(4003, () => {
    console.log('listening to port 4003');
})


// M = MODEL, V = VIEW,  C = CONTROLLER, R = ROUTES
app.get("/", (req, res)=>{res.send("Welcome to Jumia Api version 1.0")})
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter) // api/post

app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})

app.use(errorHandler);


  

  


// PROTECTED ROUTES
// MIDDLEWARE => A function that is executed before the final request handler