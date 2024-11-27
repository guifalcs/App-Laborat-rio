
export default class FaturamentoPorAmostra{

    //Atributos
    registros: dadosFPA[] = [] //Possui todos os dados da tabela analisada
    valorPorAmostra: valorPorAmostra[] = [] //Possui os valores de cada amostra da tabela analisada
    clientes: string[] = [] //Possui todos os clientes da tabela analisada

    //Métodos
    constructor(registros: dadosFPA[]){

        //Povoa o atributo registro
        this.registros = registros;

        //Calcula o valor por amostra 
        this.registros.map((registro: dadosFPA) => {

            let amostra = registro["Amostra"];
            let valor = registro["Total do Valor da Amostra"];

            this.valorPorAmostra.push([amostra, valor])

        })

        //Verifica os clientes segundo os dados do relatório
        this.registros.map((registro: dadosFPA) => {
            if(this.clientes.includes(registro["Cliente - Responsável"])){
                return;
            } else {
                this.clientes.push(registro["Cliente - Responsável"]);
            }
        })
    }

    getValorPorAmostra(){
        return this.valorPorAmostra;
    }

    getClientes(){
        return this.clientes;
    }

    faturamentoAnual(ano: string){

        let faturamentoAnual: number = 0;

        this.registros.forEach((registro: dadosFPA) => {

            if(registro["Amostra"].slice(-4) == ano) {
                let valor: number = parseFloat(registro['Total do Valor da Amostra'])
                faturamentoAnual += valor;
            }

        })

        return faturamentoAnual.toFixed(2);

    }

    topClientesAno(ano: number, top: number) {
        const clienteValores: Record<string, number> = {};
    
        this.registros.forEach((registro) => {
            const ordemServico = registro["Ordem de Servico"];
            const anoRegistro = ordemServico.slice(-4); 
            
            if (anoRegistro === ano.toString()) {
                const cliente = registro["Cliente - Responsável"];
                const valorRegistro = Number(registro["Total do Valor da Amostra"]);
                if (!clienteValores[cliente]) clienteValores[cliente] = 0;
                clienteValores[cliente] += valorRegistro;
            }
        });
    
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