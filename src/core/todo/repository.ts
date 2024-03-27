import { ITodo } from "./model";

export interface RepositorioTodo {
    atualizarDescricaoTarefa(idTarefa: number, novaDesc: string): Promise<void>;
    atualizarStatusTarefa(idTarefa: number, novoStatus: any): Promise<void>;
    completarTarefasEmLote(lista: StatusTarefa[]): Promise<void>;
    criarTarefa(tarefa: ITodo): Promise<ITodo>;
    deletarTarefa(idTarefa: number): Promise<void>; 
    deletarTarefasEmLote(listaIdTarefas: number[]): Promise<void>;
    listarTarefas(): Promise<ITodo[]>;
    obterQntDeTarefasPenCon(): Promise<ITodo[]>;    
}

type StatusTarefa = {
    idTarefa: number;
    novoStatus: string;
}