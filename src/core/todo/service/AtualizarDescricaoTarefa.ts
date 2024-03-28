import { ITodo } from "../model";
import { RepositorioTodo, StatusTarefa } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class atualizarDescricaoTarefa implements CasoDeUso<StatusTarefa, void> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: StatusTarefa): Promise<void> {
    const { idTarefa, novoStatus } = entrada;
    await this.repositorio.atualizarDescricaoTarefa(idTarefa, novoStatus);
  }
}
