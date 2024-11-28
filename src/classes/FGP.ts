import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCGP: dadosCAGP[] = [];
    registrosFaturamento: dadosFPA[] = []

    constructor(tabelaCGP: dadosCAGP[], tabelaFPA: dadosFPA[]){

        //Povoando os atributos de registro
        this.registrosCGP = tabelaCGP;
        this.registrosFaturamento = tabelaFPA;

    }

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra