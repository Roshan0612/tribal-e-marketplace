const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes =require("./routes/categoryRoutes")
const productRoutes =require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const cors = require("cors");

dotenv.config();

connectDb();

const app = express();

// middleware
// app.use(cors());
app.use(cors({
    
        origin: "http://localhost:3000", // or '*' to allow all origins, but this is less secure
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowedHeaders: ['Content-Type', 'Authorization'],
   
    
  }));
  
app.use(morgan("dev"));
app.use(express.json());


// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/order',orderRoutes);

// REST API 
app.get("/", (req, res) => {
    res.send({ msg: "<h1>this is me! roshan</h1>" });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server started at the port ${PORT} `.bgYellow.green.bold.underline);
});

