import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCGP: dadosCAGP[] = [];
    registrosFaturamento: dadosCFA[] = []

    constructor(tabelaCGP: dadosCAGP[], tabelaFPA: dadosCFA[]){

        //Instanciando classes de análise auxiliares
        const cagp = new CAGP(tabelaCGP);
        const cfa = new CFA(tabelaFPA);

        //Povoando os atributos de registro
        this.registrosCGP = tabelaCGP;
        this.registrosFaturamento = tabelaFPA;

    }

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra