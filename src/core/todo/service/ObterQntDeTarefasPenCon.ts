import { ITodo } from "../model";
import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class ObterQntDeTarefasPenCon implements CasoDeUso<void, ITodo[]> {
  constructor(private repositorio: RepositorioTodo) {}
  async executar(entrada: void): Promise<ITodo[]> {
    return await this.repositorio.obterQntDeTarefasPenCon();
  }
}
