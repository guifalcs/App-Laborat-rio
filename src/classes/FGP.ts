export default class FGP{

    registrosCGP: dadosCGP[] = [];
    registrosFaturamento: dadosFPA[] = []

    constructor(tabelaCGP: dadosCGP[], tabelaFPA: dadosFPA[]){

        //Povoando os atributos de registro
        this.registrosCGP = tabelaCGP;
        this.registrosFaturamento = tabelaFPA;

    }

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra