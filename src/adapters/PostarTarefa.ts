import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CriarTarefa } from "../core/todo/service/CriarTarefa";
import { ITodo } from "../core/todo/model";

export class PostarTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: CriarTarefa
  ) {
    this.servidor.post(
      "/api/v1/criarTarefa",
      async (
        request: FastifyRequest<{ Body: { tarefa: ITodo } }>,
        reply: FastifyReply
      ) => {
        const { tarefa } = request.body;
        const resp = await this.casoDeUso.executar(tarefa);
        return {
            status: 201,
            body: {
                mensagem: 'Tarefa criada com sucesso',
                data: resp
            }
        }
      }
    );
  }
}
