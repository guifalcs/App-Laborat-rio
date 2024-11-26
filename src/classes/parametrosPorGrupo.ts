export default class ParametrosPorGrupo {
    porcentagemParametrosPorGrupo: { [key: string]: { [key: string]: number } } =
      {};
    quantidadeParametrosPorGrupo: { [key: string]: { [key: string]: number } } =
      {};
    grupos: Array<String> = []
  
    processarDados(registros: Array<dadosTabela>) {
      let gp: Array<GP> = [];
  
      for (let i = 0; i < registros.length; i++) {
        gp.push({
          grupo: registros[i]["Grupo"],
          parametros: registros[i]["Parâmetros"],
        });
      }
  
      let grupos: Array<string> = [];
  
      let gruposComParametros: { [key: string]: { [key: string]: number } } = {};
  
      gp.forEach(({ grupo, parametros }) => {
        if (!grupos.includes(grupo)) {
          grupos.push(grupo);
        }
  
        if (!gruposComParametros[grupo]) {
          gruposComParametros[grupo] = {};
        }
  
        if (typeof parametros === "string") {
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
        } else {
          console.warn(
            `Parâmetros para o grupo "${grupo}" não são uma string válida:`,
            parametros
          );
        }
      });
  
      let porcentagens: { [key: string]: { [key: string]: number } } = {};
  
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
        return this.porcentagemParametrosPorGrupo
    }

    getGrupos(){
        return this.grupos;
    }


  }