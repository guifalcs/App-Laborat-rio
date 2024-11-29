import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCAGP: dadosCAGP[] = [];
    registrosCFA: dadosCFA[] = [];
    grupos: Array<String> = [];


    constructor(tabelaCAGP: dadosCAGP[], tabelaFPA: dadosCFA[]){

        //Instanciando classes de análise auxiliares
        const cagp = new CAGP(tabelaCAGP);
        const cfa = new CFA(tabelaFPA);

        //Povoando os atributos de registro
        this.registrosCAGP = tabelaCAGP;
        this.registrosCFA = tabelaFPA;
        this.grupos = cagp.getGrupos()
    }

    getTicketMedioGrupos(ano: string) {
        const ticketMedioGrupos: Record<string, { ocorrencias: number; valorTotal: number; ticketMedio: number }> = {};
    
        // Mapeia os registros do CAGP para processar os grupos e referências
        this.registrosCAGP.forEach((registroCAGP: dadosCAGP) => {
            const { Grupo, Referência } = registroCAGP;
    
            // Filtra pelo ano nos últimos 4 caracteres da "Referência"
            if (Referência.slice(-4) !== ano) return;
    
            // Busca o valor correspondente na tabela CFA pela "Amostra"
            const registroCFA = this.registrosCFA.find(
                (registro) => registro.Amostra === Referência && registro.Amostra.slice(-4) === ano
            );
    
            // Se não encontrar o registro correspondente, pula para o próximo
            if (!registroCFA) return;
    
            // Converte o valor de string para número
            const valor = parseFloat(registroCFA["Total do Valor da Amostra"]);
            if (isNaN(valor)) return; // Ignora valores inválidos
    
            // Se o grupo ainda não foi registrado, inicializa-o
            if (!ticketMedioGrupos[Grupo]) {
                ticketMedioGrupos[Grupo] = {
                    ocorrencias: 0,
                    valorTotal: 0,
                    ticketMedio: 0,
                };
            }
    
            // Atualiza os dados do grupo
            ticketMedioGrupos[Grupo].ocorrencias += 1;
            ticketMedioGrupos[Grupo].valorTotal += valor;
            ticketMedioGrupos[Grupo].ticketMedio =
            ticketMedioGrupos[Grupo].valorTotal / ticketMedioGrupos[Grupo].ocorrencias;
        });
    
        return ticketMedioGrupos;
    }
    
    

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra