import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ITodo } from "../core/todo/model";
import { ListarTarefas } from "../core/todo/service/ListarTarefas";

export class BuscarTarefasController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: ListarTarefas
  ) {
    this.servidor.get("api/v1/tarefa", async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const resp = await this.casoDeUso.executar()
        return reply.status(200).send({
            mensagem: "Lista de tarefas", 
            dados: resp
        })
    })
  }
}
