import { RepositorioTodo, StatusTarefa } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class atualizarStatusTarefa implements CasoDeUso<StatusTarefa, void> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: StatusTarefa): Promise<void> {
    const { idTarefa, novoStatus } = entrada;
    await this.repositorio.atualizarStatusTarefa(idTarefa, novoStatus);
  }
}
