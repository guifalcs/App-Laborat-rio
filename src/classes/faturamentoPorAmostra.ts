
export default class FaturamentoPorAmostra{

    //Atributos
    registros: dadosFPA[] = []
    valorPorAmostra: valorPorAmostra[] = []
    clientes: string[] = []
    topClientes: topCliente[] = []

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

    getClientes(){
        return this.clientes;
    }
    
    getTopClientes(){

    }

}