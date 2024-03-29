import {
  FastifyInstance,
  FastifyRequest,
} from "fastify";
import { AtualizarStatusTarefa } from "../core/todo/service/AtualizarStatusTarefa";

import { StatusTarefa } from "../core/todo/repository";

export class AtualizarStatusTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: AtualizarStatusTarefa
  ) {
    this.servidor.patch(
      "/api/v1/tarefa/status/:idTarefa",
      {
        websocket: true,
      },
      (socket, req: FastifyRequest<{ Body: { data: StatusTarefa } }>) => {
        socket.on("message", async (message: string) => {
          const resp = await this.casoDeUso.executar(req.body.data);
          socket.send(JSON.stringify(resp));
        });
      }
    );
  }
}
