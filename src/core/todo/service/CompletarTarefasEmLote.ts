import { ITodo } from "../model";
import { RepositorioTodo, StatusTarefa } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class CompletarTarefasEmLote implements CasoDeUso<number[], any> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: number[]) {
    return await this.repositorio.completarTarefasEmLote(entrada);
  }
}
