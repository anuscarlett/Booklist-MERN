import express from "express";
import mongoose from "mongoose"
import bookRoutes from "./routes/bookRoutes.js"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

//middleware to parse req body
app.use(express.json())

//middleware for handling CORS POLICY
//option1: allow all origins with default of cors(*)
app.use(cors())
//option-2 :allow custom origin
// app.use(cors({
//     origin: "http://localhost:3000",
//     mehods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowHeaders: ['Content-Type'],
// }))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('ur welcome')
})

app.use('/books', bookRoutes);

async function startServer() {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB connected');

        // Start the Express server
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Call the function to start the server
startServer();