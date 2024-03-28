import { ITodo } from "../model";
import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class ListarTarefas implements CasoDeUso<void, ITodo[]> {
  constructor(private readonly repositorio: RepositorioTodo) {}

  async executar(entrada: void): Promise<ITodo[]> {
    return await this.repositorio.listarTarefas();
  }
}
