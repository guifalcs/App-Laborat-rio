
const XLSX = require('xlsx');
const arquivo = XLSX.readFile('./src/planilhas/Faturamento por parâmetros-amostra-OS-proposta-cliente desde 2020.xlsx');
const tabela = arquivo.Sheets[arquivo.SheetNames[0]];
const dadosTabela = XLSX.utils.sheet_to_json(tabela);

console.log(dadosTabela)

