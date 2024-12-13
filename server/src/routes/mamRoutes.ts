import express, {Request, Response} from 'express'

const mamRoutes = express.Router()

mamRoutes.get('/', (req: Request, res: Response) => {
    res.send('Rota get no mam funcionando')
})

export default mamRoutes