
const mongoose = require('mongoose');
const connectDB = require('./DB/Connect');
// connectDB()




const express = require('express');
const userRoutes = require('./Routes/UserRoutes');
const ProductRoutes = require('./Routes/ProductRoutes');
cors = require('cors');
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Server is running on the port ${PORT}`)
        })
        app.use(express.json());
        app.use('/user', userRoutes)
        app.use('/product', ProductRoutes)

        
        
    }
    catch(error){
        console.log(error)
    }
}
startServer();


// const app = express();
// app.use(express.json());
// app.use(cors());




// app.listen(3001, () => {
//    console.log('Server is running on port 3001');
// });

// mongoose.connectDB

