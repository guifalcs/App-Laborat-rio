import FGP from "../analisadores/FGP";

const XLSX = require('xlsx');
const arquivoCAGP = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');
const arquivoCFA = XLSX.readFile('./src/planilhas/Faturamento por parâmetros-amostra-OS-proposta-cliente desde 2020.xlsx');

const tabelaCGP = arquivoCAGP.Sheets[arquivoCAGP.SheetNames[0]];
const dadosTabelaCAGP: any[] = XLSX.utils.sheet_to_json(tabelaCGP);

const tabelaFPA = arquivoCFA.Sheets[arquivoCFA.SheetNames[0]]
const dadosTabelaCFA: any[] = XLSX.utils.sheet_to_json(tabelaFPA)

const fgp = new FGP(dadosTabelaCAGP, dadosTabelaCFA);

export default fgp


