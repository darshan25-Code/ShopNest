const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express()
const PORT = process.env.PORT || 5000 

app.use(cors());
app.use(express.json())

app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/",(req,res)=>{
    res.send("Server is running.....")
})

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `);
    
})