import express from 'express';
import dotenv from 'dotenv';
import emailRouter from './routes/email.routes.js'
dotenv.config()


const app = express();
app.use(express.json())
app.use('/api', emailRouter)

const PORT= process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log('listening on port '+PORT);
});

