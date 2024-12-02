import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCAGP: dadosCAGP[] = [];
    registrosCFA: dadosCFA[] = [];
    grupos: Array<String> = [];
    cfa: any = []
    cagp: any = []


    constructor(tabelaCAGP: dadosCAGP[], tabelaCFA: dadosCFA[]){

        //Instanciando classes de análise auxiliares
        this.cagp = new CAGP(tabelaCAGP);
        this.cfa = new CFA(tabelaCFA);

        //Povoando os atributos de registro
        this.registrosCAGP = tabelaCAGP;
        this.registrosCFA = tabelaCFA;
        this.grupos = this.cagp.getGrupos()
    }

    getTicketMedioGruposAno(ano: string) {
        const ticketMedioGrupos: Record<string, { ocorrencias: number; valorTotal: number; ticketMedio: number }> = {};
    
        // Criar um Map para busca eficiente por Amostra
        const cfaMap = new Map<string, dadosCFA>();
        this.registrosCFA.forEach((registro) => {
            cfaMap.set(registro['Amostra'], registro);
        });
    
        // Processar registros do CAGP
        this.registrosCAGP.forEach((registroCAGP: dadosCAGP) => {
            const grupo = registroCAGP['Grupo'];
            const referencia = registroCAGP['Referência'];
            
            // Filtra pelo ano nos últimos 4 caracteres da "Referência"
            const anoReferencia = referencia.slice(-4);
            if (anoReferencia !== ano) return;
    
            // Busca o valor correspondente na tabela CFA pelo Map
            const registroCFA = cfaMap.get(referencia);
    
            // Se não encontrar o registro correspondente, pula para o próximo
            if (!registroCFA) return;
    
            // Converte o valor de string para número
            const valor = Number(registroCFA["Total do Valor da Amostra"]);
            if (isNaN(valor)) return;
    
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
            ticketMedioGrupos[grupo].valorTotal = Math.round((ticketMedioGrupos[grupo].valorTotal + valor) * 100) / 100;
            ticketMedioGrupos[grupo].ticketMedio =
                Math.round((ticketMedioGrupos[grupo].valorTotal / ticketMedioGrupos[grupo].ocorrencias) * 100) / 100;
        });
    
        return ticketMedioGrupos;
    }
    
    getClientesPorFaixa(ano: string){

        let faturamentoAnual = this.cfa.getFaturamentoAnual(ano)
        let faixas: any[] = [{faixa: 20, valor: 0}, {faixa: 40, valor: 0}, {faixa: 60, valor: 0}, {faixa: 80, valor: 0}]

        faixas.forEach((faixa) => {
            faixa.valor = Math.round((faturamentoAnual * faixa.faixa) / 100)
        })

        let clientes = this.cfa.getClientesAno('2024')
        console.log(clientes)
        
    }
    
    

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra