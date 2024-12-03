import CAGP from "../analisadores/CAGP";
import XLSX from 'xlsx'

const arquivo = XLSX.readFile('./src/planilhas/relatorioCGP.xlsx');
const tabela = arquivo.Sheets[arquivo.SheetNames[0]];
const dadosTabela: any[] = XLSX.utils.sheet_to_json(tabela);


const cagp = new CAGP(dadosTabela)

export default cagp
