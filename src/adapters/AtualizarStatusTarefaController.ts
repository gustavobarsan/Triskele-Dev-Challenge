import {
  FastifyInstance,
  FastifyRequest,
} from "fastify";
import { AtualizarStatusTarefa } from "../core/todo/service/AtualizarStatusTarefa";
import websocket from "@fastify/websocket";
import { StatusTarefa } from "../core/todo/repository";

export class AtualizarStatusTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: AtualizarStatusTarefa
  ) {
    this.servidor.register(websocket, { options: { maxPayload: 123452 } });
    this.servidor.patch(
      "/api/v1/tarefa/:idTarefa",
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
