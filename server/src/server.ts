import express from 'express'
import router from './router'

const app = express()
const port = process.env.SERVER_PORT || 8081

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})