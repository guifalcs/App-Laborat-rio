import CAGP from "../classes/CAGP";

const XLSX = require('xlsx');
const arquivo = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');
const tabela = arquivo.Sheets[arquivo.SheetNames[0]];
const dadosTabela = XLSX.utils.sheet_to_json(tabela);


const parametrosPorGrupo = new CAGP(dadosTabela)

export default parametrosPorGrupo
