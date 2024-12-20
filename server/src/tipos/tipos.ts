//Tipo para registros de grupo e parâmetros
type GP = {
    grupo: string,
    parametros: string
}

//Tipo para os dados do relatório de Clientes - Amostra - Grupos - Parâmetros
type dadosCAGP = {
    Cliente: string,
    'Ordem de serviço': string,
    'Referência': string,
    'Código Barra': string,
    'Descrição': string,
    Grupo: string,
    'Data de Entrada': string,
    'Parâmetros': string
}

//Tipo para os dados do relatório de Cliente, Faturamento por amostra
type dadosCFA = {
    'ID Fatura': number,
    'Cliente - Responsável': string,
    Fatura: string,
    'Ordem de Servico': string,
    'Amostra': string,
    'Total do Valor da Amostra': string
}

//Tipo para o array de valor por amostra
type valorPorAmostra = [
    amostra: string,
    valor: string
]

//Tipo para array de amostra, se grupo e seus parametros
type agp = [
    amostra: string,
    grupo: string,
    parametros: string[]
]