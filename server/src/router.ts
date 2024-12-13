import express from 'express'
import marRoutes from './routes/marRoutes'
import mamRoutes from './routes/mamRoutes'

const router = express.Router()

router.use('/mam', mamRoutes)
router.use('/mar', marRoutes)

export default router