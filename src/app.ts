import ParametrosPorGrupo from "./classes/parametrosPorGrupo";

const XLSX = require('xlsx');
const arquivo = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');
const tabela = arquivo.Sheets[arquivo.SheetNames[0]];
const dadosTabela = XLSX.utils.sheet_to_json(tabela);


const parametrosPorGrupo = new ParametrosPorGrupo()

parametrosPorGrupo.processarDados(dadosTabela)

console.log(parametrosPorGrupo.getQPG())