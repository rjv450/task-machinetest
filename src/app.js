import dotenv  from 'dotenv'
import express  from 'express'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
const app = express()
connectDB()
dotenv.config()
app.use(express.json());
app.use('/api/users',userRouter)
app.use('/api',authRouter)
export default app