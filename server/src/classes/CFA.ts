
export default class CFA{

    //Atributos
    registros: dadosCFA[] = [] //Possui todos os dados da tabela analisada
    valorPorAmostra: valorPorAmostra[] = [] //Possui os valores de cada amostra da tabela analisada
    clientes: string[] = [] //Possui todos os clientes da tabela analisada
    faturamentoPorCliente: Record<string,number> = {}

    //Métodos
    constructor(registros: dadosCFA[]){

        //Povoa o atributo registro
        this.registros = registros;

        //Calcula o valor por amostra 
        this.registros.map((registro: dadosCFA) => {

            let amostra = registro["Amostra"];
            let valor = registro["Total do Valor da Amostra"];

            this.valorPorAmostra.push([amostra, valor])

        })

        
    }

    getValorPorAmostra(){
        return this.valorPorAmostra;
    }

    getClientesAno(ano: string){
    
        // Verifica os clientes segundo os dados do relatório
        this.registros.forEach((registro: dadosCFA) => {
            const amostraAno = registro['Amostra'].slice(-4); 
    
            // Verifica se o ano corresponde e se o cliente já não está na lista
            if (amostraAno === ano && !this.clientes.includes(registro["Cliente - Responsável"])) {
                this.clientes.push(registro["Cliente - Responsável"]);
            }
        });
    
        return this.clientes;
    }

    getTicketMedioAno(ano: string){
        let registrosAno = this.registros.filter((registro) => {
            return registro["Amostra"].slice(-4) === ano;
        });

        let faturamento = Number(this.getFaturamentoAnual(ano))

        if (isNaN(faturamento)) {
            throw new Error(`Faturamento anual inválido para o ano ${ano}`);
        }

        if (registrosAno.length === 0) {
            return "Erro de divisão por zero"
        }

        let ticketmedio = Math.round((faturamento / registrosAno.length) * 100) / 100;
        return ticketmedio
    }

    getTicketMedioClienteAno(cliente: string, ano: string){

        let clientesValores = this.getFaturamentoPorClienteAno(ano)
        let clienteRegistrosTicketMedio: any = {}

        this.registros.forEach((registro: dadosCFA) => {

            const ordemServico = registro["Ordem de Servico"];
            const anoRegistro = ordemServico.slice(-4); 

            if(!clienteRegistrosTicketMedio[registro['Cliente - Responsável']] && registro["Amostra"].slice(-4) == ano){
                clienteRegistrosTicketMedio[registro['Cliente - Responsável']] = {
                    registros: 1,
                    faturamento: Number(registro["Total do Valor da Amostra"]),
                    ticketMedio: Number(registro["Total do Valor da Amostra"])
                }
            } else if(clienteRegistrosTicketMedio[registro['Cliente - Responsável']] && registro["Amostra"].slice(-4) == ano) {
                clienteRegistrosTicketMedio[registro['Cliente - Responsável']].registros++
                clienteRegistrosTicketMedio[registro['Cliente - Responsável']].faturamento += Number(registro["Total do Valor da Amostra"])
                clienteRegistrosTicketMedio[registro['Cliente - Responsável']].ticketMedio = clienteRegistrosTicketMedio[registro['Cliente - Responsável']].faturamento / clienteRegistrosTicketMedio[registro['Cliente - Responsável']].registros
            }
        })

        const clientesFiltrados = Object.entries(clienteRegistrosTicketMedio)
        .filter(([nomeCliente]) => nomeCliente.toLowerCase().includes(cliente.toLowerCase()))
        .map(([nomeCliente, ticketMedio]) => ({
            cliente: nomeCliente,
            ticketMedio: ticketMedio
        }));

        if (clientesFiltrados.length === 0) {
        return `Nenhum cliente encontrado para o termo "${cliente}" no ano ${ano}.`;
        }

        return clientesFiltrados;

    }

    getFaturamentoPorClienteAno(ano: string){

        this.registros.forEach((registro: dadosCFA) => {
            const ordemServico = registro["Ordem de Servico"];
            const anoRegistro = ordemServico.slice(-4); 
            
            if (anoRegistro === ano.toString()) {
                const cliente = registro["Cliente - Responsável"];
                const valorRegistro = Number(registro["Total do Valor da Amostra"]);
                if (!this.faturamentoPorCliente[cliente]) this.faturamentoPorCliente[cliente] = 0;
                this.faturamentoPorCliente[cliente] += valorRegistro;
            }
        });

    return this.faturamentoPorCliente

    }

    getFaturamentoAnual(ano: string): number {
        return this.registros
            .filter((registro: dadosCFA) => registro["Amostra"].slice(-4) === ano) // Filtra registros do ano desejado
            .reduce((faturamento, registro) => {
                const valor = Math.round(Number(registro['Total do Valor da Amostra']) * 100) / 100; // Converte e arredonda
                return faturamento + valor; // Soma o valor ao total acumulado
            }, 0); // Inicializa o acumulador como 0
    }

    getTopClientesAno(ano: string, top: number) {
        let clienteValores: Record<string,number> = {};
    
        clienteValores = this.getFaturamentoPorClienteAno(ano)
    
        const topClientes = Object.entries(clienteValores)
            .map(([cliente, valor]) => ({
                cliente,
                valor: Number(valor.toFixed(2)),
            }))
            .sort((a, b) => b.valor - a.valor)
            .slice(0, top);
    
        return topClientes;
    }
    

}

//CFA: Classe para ler a tabela de clientes e o faturamento de cada amostra realizada