import { ITodo } from "../model";
import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class CriarTarefa implements CasoDeUso<ITodo, ITodo> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: ITodo): Promise<ITodo> {
    return await this.repositorio.criarTarefa(entrada);
  }
}