import express from 'express'
import mainRouter from '../routes/index'

const app = express();

app.use('/api', mainRouter)




export default app
