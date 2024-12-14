import express, {Request, Response} from 'express'
import cagp from '../MAR/leitores/leituraCAGP'

const marRoutes = express.Router()

marRoutes.get('/', (req: Request, res: Response) => {
    const resultado = cagp.getPPG()
    res.send(JSON.stringify(resultado))
})

export default marRoutes