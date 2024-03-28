import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeletarTarefa } from "../core/todo/service/DeletarTarefa";

export class DeletarTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: DeletarTarefa
  ) {
    this.servidor.delete(
      "/api/v1/tarefa/:idTarefa",
      async (
        request: FastifyRequest<{ Querystring: { idTarefa: number } }>,
        reply: FastifyReply
      ) => {
        const { idTarefa } = request.query;
        await this.casoDeUso.executar(idTarefa);
        return reply.status(200).send({
          mensagem: "Tarefas deletada",
        });
      }
    );
  }
}
