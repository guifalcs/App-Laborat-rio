import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCAGP: dadosCAGP[] = [];
    registrosCFA: dadosCFA[] = [];
    grupos: Array<String> = [];


    constructor(tabelaCAGP: dadosCAGP[], tabelaCFA: dadosCFA[]){

        //Instanciando classes de análise auxiliares
        const cagp = new CAGP(tabelaCAGP);
        const cfa = new CFA(tabelaCFA);

        //Povoando os atributos de registro
        this.registrosCAGP = tabelaCAGP;
        this.registrosCFA = tabelaCFA;
        this.grupos = cagp.getGrupos()
    }

    getTicketMedioGruposAno(ano: string) {
        const ticketMedioGrupos: Record<string, { ocorrencias: number; valorTotal: number; ticketMedio: number }> = {};
    
        // Mapeia os registros do CAGP para processar os grupos e referências
        this.registrosCAGP.forEach((registroCAGP: dadosCAGP) => {
            const grupo = registroCAGP['Grupo']
            const referencia = registroCAGP['Referência']

            // Filtra pelo ano nos últimos 4 caracteres da "Referência"
            if (referencia.slice(-4) != ano) return
    
            // Busca o valor correspondente na tabela CFA pela "Amostra"
            const registroCFA = this.registrosCFA.find(
                (registro: dadosCFA) => {
                    return registro['Amostra'] == referencia && registro['Amostra'].slice(-4) == ano
                }
            );
    
            // Se não encontrar o registro correspondente, pula para o próximo
            if (!registroCFA) return
    
            // Converte o valor de string para número
            const valor = Number(registroCFA["Total do Valor da Amostra"]);
    
            // Se o grupo ainda não foi registrado, inicializa-o
            if (!ticketMedioGrupos[grupo]) {
                ticketMedioGrupos[grupo] = {
                    ocorrencias: 0,
                    valorTotal: 0,
                    ticketMedio: 0,
                };
            }
    
            // Atualiza os dados do grupo
            ticketMedioGrupos[grupo].ocorrencias += 1;
            ticketMedioGrupos[grupo].valorTotal = Number((ticketMedioGrupos[grupo].valorTotal + valor).toFixed(2))
            ticketMedioGrupos[grupo].ticketMedio =
            Number((ticketMedioGrupos[grupo].valorTotal / ticketMedioGrupos[grupo].ocorrencias).toFixed(2))
        });
    
        return ticketMedioGrupos;
    }
    
    

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra