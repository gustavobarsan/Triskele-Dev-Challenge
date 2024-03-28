import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeletarTarefaEmLote } from "../core/todo/service/DeletarTarefasEmLote";

export class DeletarTarefasEmLoteController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: DeletarTarefaEmLote
  ) {
    this.servidor.delete(
      "/api/v1/tarefa",
      async (
        request: FastifyRequest<{ Body: { listaIdsTarefas: number[] } }>,
        reply: FastifyReply
      ) => {
        const { listaIdsTarefas } = request.body;
        await this.casoDeUso.executar(listaIdsTarefas);
        return reply.status(200).send({
          mensagem: "Tarefas deletadas",
        });
      }
    );
  }
}
