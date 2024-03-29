import { ITodo } from "../model";
import { RepositorioTodo } from "../repository";
import CasoDeUso from "../shared/CasoDeUso";

export type NovaDesc = {
  idTarefa: number,
  novaDesc: string
}

export class AtualizarDescricaoTarefa implements CasoDeUso<NovaDesc, any> {
  constructor(private readonly repositorio: RepositorioTodo) {}
  async executar(entrada: NovaDesc): Promise<any> {
    const { idTarefa, novaDesc } = entrada;
    const resp = await this.repositorio.atualizarDescricaoTarefa(idTarefa, novaDesc);
    return resp
  }
}
