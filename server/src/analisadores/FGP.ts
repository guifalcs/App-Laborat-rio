import CAGP from "./CAGP";
import CFA from "./CFA";

export default class FGP{

    registrosCAGP: dadosCAGP[] = [];
    registrosCFA: dadosCFA[] = [];
    grupos: Array<String> = [];
    cfa: any = []
    cagp: any = []


    constructor(tabelaCAGP: dadosCAGP[], tabelaCFA: dadosCFA[]){

        this.cagp = new CAGP(tabelaCAGP);
        this.cfa = new CFA(tabelaCFA);

        this.registrosCAGP = tabelaCAGP;
        this.registrosCFA = tabelaCFA;
        this.grupos = this.cagp.getGrupos()
    }

    getTicketMedioGruposAno(ano: string) {
        const ticketMedioGrupos: Record<string, { ocorrencias: number; valorTotal: number; ticketMedio: number }> = {};
    
        const cfaMap = new Map<string, dadosCFA>();
        this.registrosCFA.forEach((registro) => {
            cfaMap.set(registro['Amostra'], registro);
        });
    
        this.registrosCAGP.forEach((registroCAGP: dadosCAGP) => {
            const grupo = registroCAGP['Grupo'];
            const referencia = registroCAGP['Referência'];
            
            const anoReferencia = referencia.slice(-4);
            if (anoReferencia !== ano) return;
    
            const registroCFA = cfaMap.get(referencia);
    
            if (!registroCFA) return;
    
            const valor = Number(registroCFA["Total do Valor da Amostra"]);
            if (isNaN(valor)) return;
    
            if (!ticketMedioGrupos[grupo]) {
                ticketMedioGrupos[grupo] = {
                    ocorrencias: 0,
                    valorTotal: 0,
                    ticketMedio: 0,
                };
            }
    
            ticketMedioGrupos[grupo].ocorrencias += 1;
            ticketMedioGrupos[grupo].valorTotal = Math.round((ticketMedioGrupos[grupo].valorTotal + valor) * 100) / 100;
            ticketMedioGrupos[grupo].ticketMedio =
                Math.round((ticketMedioGrupos[grupo].valorTotal / ticketMedioGrupos[grupo].ocorrencias) * 100) / 100;
        });
    
        return ticketMedioGrupos
    }
    
    getClientesPorFaixa(ano: string) {
        // Obtém os dados dos clientes
        let clientes = this.cfa.getFaturamentoPorClienteAno(ano);
    
        // Ordena os clientes pelo faturamento em ordem decrescente
        let rankingClientes = Object.entries(clientes)
            .map(([cliente, valor]) => ({ cliente, valor: Math.round(valor as number) }))
            .sort((a, b) => b.valor - a.valor); // Ordenação decrescente pelo valor
    
        // Calcula o total de clientes
        let totalClientes = rankingClientes.length;
    
        // Define as faixas como percentuais do ranking
        let faixas: any[] = [
            { faixa: '0-20%', inicio: 0, fim: Math.ceil((20 / 100) * totalClientes), clientes: [] },
            { faixa: '20-40%', inicio: Math.ceil((20 / 100) * totalClientes), fim: Math.ceil((40 / 100) * totalClientes), clientes: [] },
            { faixa: '40-60%', inicio: Math.ceil((40 / 100) * totalClientes), fim: Math.ceil((60 / 100) * totalClientes), clientes: [] },
            { faixa: '60-80%', inicio: Math.ceil((60 / 100) * totalClientes), fim: Math.ceil((80 / 100) * totalClientes), clientes: [] },
            { faixa: '80-100%', inicio: Math.ceil((80 / 100) * totalClientes), fim: totalClientes, clientes: [] },
        ];
    
        // Distribui os clientes nas faixas de acordo com a posição no ranking
        rankingClientes.forEach((cliente, index) => {
            faixas.forEach((faixa) => {
                if (index >= faixa.inicio && index < faixa.fim) {
                    faixa.clientes.push(cliente);
                }
            });
        });

        return faixas[0]
        
    }
    
    
    

}

//FGP: Classe para relacionar as tabelas de Faturamento por amostra com grupos e parametros por amostra