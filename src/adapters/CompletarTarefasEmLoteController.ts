import { FastifyInstance, FastifyRequest } from "fastify";
import { CompletarTarefasEmLote } from "../core/todo/service/CompletarTarefasEmLote";
import websocket from "@fastify/websocket";
import { StatusTarefa } from "../core/todo/repository";

export class CompletarTarefasEmLoteController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: CompletarTarefasEmLote
  ) {
    this.servidor.register(websocket, { options: { maxPayload: 123452 } });
    this.servidor.patch(
      "/api/v1/tarefa/:idTarefa",
      {
        websocket: true,
      },
      (socket, req: FastifyRequest<{ Body: { data: StatusTarefa[] } }>) => {
        socket.on("message", async (message: string) => {
          const resp = await this.casoDeUso.executar(req.body.data);
          socket.send(JSON.stringify(resp));
        });
      }
    );
  }
}
