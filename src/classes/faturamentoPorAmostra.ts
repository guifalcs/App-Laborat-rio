
export default class FaturamentoPorAmostra{

    //Atributos
    registros: dadosFPA[] = []
    valorPorAmostra: valorPorAmostra[] = []

    //Métodos
    constructor(registros: dadosFPA[]){

        //Povoa o atributo registro
        this.registros = registros;

        //Povoa o atributo valorPorAmostra
        this.registros.map((registro: dadosFPA) => {

            let amostra = registro["Amostra"];
            let valor = registro["Total do Valor da Amostra"];

            this.valorPorAmostra.push([amostra, valor])

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

}