import { FastifyInstance, FastifyRequest } from "fastify";
import { CompletarTarefasEmLote } from "../core/todo/service/CompletarTarefasEmLote";

export class CompletarTarefasEmLoteController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: CompletarTarefasEmLote
  ) {
    this.servidor.patch(
      "/api/v1/tarefa/:idTarefa",
      {
        websocket: true,
      },
      (socket, req: FastifyRequest<{ Body: { data: number[] } }>) => {
        socket.on("message", async (message: string) => {
          const resp = await this.casoDeUso.executar(req.body.data);
          socket.send(JSON.stringify(resp));
        });
      }
    );
  }
}
