import express from 'express'
import router from './router'
import cors from 'cors'

const app = express()
const port = process.env.SERVER_PORT || 8081

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})