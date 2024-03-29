import { RepositorioTodo, StatusTarefa } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export class AtualizarStatusTarefa implements CasoDeUso<StatusTarefa, any> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: StatusTarefa): Promise<any> {
    const { idTarefa, novoStatus } = entrada;
    return await this.repositorio.atualizarStatusTarefa(idTarefa, novoStatus);
  }
}
