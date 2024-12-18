import express from 'express'
import marRoutes from './routes/marRoutes'

const router = express.Router()

router.use('/mar', marRoutes)

export default router