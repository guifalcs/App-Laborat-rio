import express, {Request, Response} from 'express'

const marRoutes = express.Router()

marRoutes.get('/', (req: Request, res: Response) => {
    res.send('Rota get no mar funcionando')
})

export default marRoutes