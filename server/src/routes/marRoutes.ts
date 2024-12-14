import express, {Request, Response} from 'express'
import cfa from '../MAR/leitores/leituraCFA'

const marRoutes = express.Router()

marRoutes.get('/', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const clientesGenerator = cfa.getClientesAno("2024")
    let cliente;

    for(cliente of clientesGenerator){
        res.write(JSON.stringify(cliente) + '\n')
    }

    res.end()
})

export default marRoutes