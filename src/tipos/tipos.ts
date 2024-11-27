//Tipo para registros de grupo e parâmetros
type GP = {
    grupo: string,
    parametros: string
}

//Tipo para os dados do relatório de Clientes - Grupos - Parâmetros
type dadosCGP = {
    Cliente: string,
    'Ordem de serviço': string,
    'Referência': string,
    'Código Barra': string,
    'Descrição': string,
    Grupo: string,
    'Data de Entrada': string,
    'Parâmetros': string
}

//Tipo para os dados do relatório de Faturamento por Amostra
type dadosFPA = {
    'ID Fatura': number,
    'Cliente - Responsável': string,
    Fatura: string,
    'Ordem de Servico': string,
    'Total do Valor da Amostra': string
}