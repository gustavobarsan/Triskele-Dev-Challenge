import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class ObterQntDeTarefasPenCon implements CasoDeUso<void, any> {
  constructor(private repositorio: RepositorioTodo) {}
  async executar(entrada: void): Promise<any> {
    return await this.repositorio.obterQntDeTarefasPenCon();
  }
}
