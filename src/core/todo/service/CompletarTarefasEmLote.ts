import { ITodo } from "../model";
import { RepositorioTodo, StatusTarefa } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class CompletarTarefasEmLote implements CasoDeUso<StatusTarefa[], ITodo[]> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: StatusTarefa[]) {
    return await this.repositorio.completarTarefasEmLote(entrada);
  }
}
