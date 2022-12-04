import express from 'express'
import mainRouter from '../routes/index'

const app = express();


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', mainRouter)



export default app