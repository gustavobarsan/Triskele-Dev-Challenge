import { ITodo } from "../model";
import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class DeletarTarefaEmLote implements CasoDeUso<number[], void> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: number[]): Promise<void> {
    await this.repositorio.deletarTarefasEmLote(entrada);
  }
}
