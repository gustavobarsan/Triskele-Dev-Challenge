import { ITodo } from "./model";

export interface RepositorioTodo {
  atualizarDescricaoTarefa(idTarefa: number, novaDesc: string): Promise<string>;
  atualizarStatusTarefa(idTarefa: number, novoStatus: any): Promise<boolean>;
  completarTarefasEmLote(lista: StatusTarefa[]): Promise<ITodo[]>;
  criarTarefa(tarefa: ITodo): Promise<ITodo>;
  deletarTarefa(idTarefa: number): Promise<void>;
  deletarTarefasEmLote(listaIdTarefas: number[]): Promise<void>;
  listarTarefas(): Promise<ITodo[]>;
  obterQntDeTarefasPenCon(): Promise<ITodo[]>;
}

export type StatusTarefa = {
  idTarefa: number;
  novoStatus: string;
};
