import { ITodo } from "./model";

export interface RepositorioTodo {
  atualizarDescricaoTarefa(idTarefa: number, novaDesc: string): Promise<any>;
  atualizarStatusTarefa(idTarefa: number, novoStatus: any): Promise<any>;
  completarTarefasEmLote(lista: number[]): Promise<ITodo[]>;
  criarTarefa(tarefa: ITodo): Promise<ITodo>;
  deletarTarefa(idTarefa: number): Promise<void>;
  deletarTarefasEmLote(listaIdTarefas: number[]): Promise<void>;
  listarTarefas(): Promise<ITodo[]>;
  obterQntDeTarefasPenCon(): Promise<any>;
}

export type StatusTarefa = {
  idTarefa: number;
  novoStatus: string;
};
