import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CriarTarefa } from "../core/todo/service/CriarTarefa";
import { ITodo } from "../core/todo/model";

export class PostarTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: CriarTarefa
  ) {
    this.servidor.post(
      "/api/v1/tarefa",
      async (
        request: FastifyRequest<{ Body: { tarefa: ITodo } }>,
        reply: FastifyReply
      ) => {
        const { tarefa } = request.body;
        const resp = await this.casoDeUso.executar(tarefa);
        return reply.status(201).send({
          mensagem: "Tarefa criada com sucesso",
          dados: resp,
        });
      }
    );
  }
}
