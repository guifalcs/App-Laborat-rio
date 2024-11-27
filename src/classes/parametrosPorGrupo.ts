export default class ParametrosPorGrupo {

    //Atributos
    registros: any[] = []
    porcentagemParametrosPorGrupo: { [key: string]: { [key: string]: number } } =
      {};
    quantidadeParametrosPorGrupo: { [key: string]: { [key: string]: number } } =
      {};
    grupos: Array<String> = [];
  
    //Métodos
    processarDados(registros: Array<dadosTabela>) {

      //Inicializa o atributo registro
      this.registros = registros;

      let gp: Array<GP> = []; //Array com grupo e parâmetros de cada registro
  
      for (let i = 0; i < registros.length; i++) {
        gp.push({
          grupo: registros[i]["Grupo"],
          parametros: registros[i]["Parâmetros"],
        });
      }
  
      let grupos: Array<string> = []; // Array com todos os tipos de grupos (Strings)
  
      let gruposComParametros: { [key: string]: { [key: string]: number } } = {}; // Grupos com a quantidade que cada parâmetro apareceu nos registros associado a ele 
  
      gp.forEach(({ grupo, parametros }) => {
        if (!grupos.includes(grupo)) {
          grupos.push(grupo);
        }
  
        if (!gruposComParametros[grupo]) {
          gruposComParametros[grupo] = {};
        }
  
          const parametrosComMarcador = parametros.replace(/(\d),(\d)/g, "$1_$2");
  
          const listaParametros = parametrosComMarcador
            .split(",")
            .map((param: any) => param.trim());
  
          const listaParametrosCorrigidos = listaParametros.map((param: any) =>
            param.replace(/_/g, ",")
          );
  
          listaParametrosCorrigidos.forEach((parametro: any) => {
            if (!gruposComParametros[grupo][parametro]) {
              gruposComParametros[grupo][parametro] = 0;
            }
            gruposComParametros[grupo][parametro]++;
          });
        
      });
  
      let porcentagens: { [key: string]: { [key: string]: number } } = {}; //Objeto com os grupos como propriedades e com os parâmetros como valores que são objetos com o valor de sua porcentagem
  
      grupos.forEach((grupo) => {
        let totalParametrosGrupo = 0;
        for (let parametro in gruposComParametros[grupo]) {
          totalParametrosGrupo += gruposComParametros[grupo][parametro];
        }
  
        let parametrosPorGrupo = [];
        for (let parametro in gruposComParametros[grupo]) {
          let count = gruposComParametros[grupo][parametro];
          let percentage = (count / totalParametrosGrupo) * 100;
          parametrosPorGrupo.push({
            parametro,
            percentage: parseFloat(percentage.toFixed(2)), 
          });
        }
  
        parametrosPorGrupo.sort((a, b) => b.percentage - a.percentage);
  
        porcentagens[grupo] = {};
        parametrosPorGrupo.forEach(({ parametro, percentage }) => {
          porcentagens[grupo][parametro] = percentage;
        });
  
        let parametrosOrdenados = Object.entries(gruposComParametros[grupo])
          .sort(([, countA], [, countB]) => countB - countA)
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {} as { [key: string]: number });
  
        gruposComParametros[grupo] = parametrosOrdenados;
      });
  
      this.porcentagemParametrosPorGrupo = porcentagens;
      this.quantidadeParametrosPorGrupo = gruposComParametros;
      this.grupos = grupos
    }

    getPPG(){
        return this.porcentagemParametrosPorGrupo;
    }

    getQPG(){
        return this.quantidadeParametrosPorGrupo;
    }

    getGrupos(){
        return this.grupos;
    }

    getTopPPG() {
        const topPPG: { [key: string]: { [key: string]: number } } = {};
    
        for (const grupo in this.porcentagemParametrosPorGrupo) {
          const parametros = this.porcentagemParametrosPorGrupo[grupo];
    
          const topParametros = Object.entries(parametros)
            .slice(0, 10) 
            .reduce((acc, [parametro, percentage]) => {
              acc[parametro] = percentage;
              return acc;
            }, {} as { [key: string]: number });
    
          topPPG[grupo] = topParametros;
        }
    
        return topPPG;
    }

    getTopQPG() {
        const topQPG: { [key: string]: { [key: string]: number } } = {};
    
        for (const grupo in this.quantidadeParametrosPorGrupo) {

          const topParametros = Object.entries(this.quantidadeParametrosPorGrupo[grupo])
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 10)
            .reduce((acc, [parametro, count]) => {
              acc[parametro] = count;
              return acc;
            }, {} as { [key: string]: number });
    
          topQPG[grupo] = topParametros;
        }
    
        return topQPG;
    }

    getTopGrupos(){
        
        const gruposContagem: { [key: string]: number } = {};

        this.registros.forEach((registro) => {
              const grupo = registro["Grupo"]; 
              if (grupo) {

              if (gruposContagem[grupo]) {
                  gruposContagem[grupo]++;

              } else {
                  gruposContagem[grupo] = 1;
              }
              }
          });

          const gruposOrdenados = Object.entries(gruposContagem)
              .sort(([, a], [, b]) => b - a) 
              .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
              }, {} as { [key: string]: number });

          return gruposOrdenados; 
          }

    }

  