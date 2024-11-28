import FGP from "../classes/FGP";

const XLSX = require('xlsx');
const arquivoCGP = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');
const arquivoFaturamento = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');

const tabelaCGP = arquivoCGP.Sheets[arquivoCGP.SheetNames[0]];
const dadosTabelaCGP = XLSX.utils.sheet_to_json(tabelaCGP);

const tabelaFPA = arquivoFaturamento.Sheets[arquivoFaturamento.SheetNames[0]]
const dadosTabelaFaturamento = XLSX.utils.sheet_to_json(tabelaFPA)

const fgp = new FGP(tabelaCGP, tabelaFPA);

export default fgp


