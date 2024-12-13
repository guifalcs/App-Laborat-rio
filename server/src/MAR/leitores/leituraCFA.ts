import XLSX from 'xlsx'
import CFA from "../analisadores/CFA";

const arquivo = XLSX.readFile('./src/planilhas/Faturamento por parâmetros-amostra-OS-proposta-cliente desde 2020.xlsx');
const tabela = arquivo.Sheets[arquivo.SheetNames[0]];
const dadosTabela: any[] = XLSX.utils.sheet_to_json(tabela);

const cfa = new CFA(dadosTabela)

export default cfa


