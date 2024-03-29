import { FastifyInstance, FastifyRequest } from "fastify";
import { AtualizarDescricaoTarefa, NovaDesc } from "../core/todo/service/AtualizarDescricaoTarefa";
import websocket from "@fastify/websocket";

export class AtualizarDescricaoTarefaController {
  constructor(
    readonly servidor: FastifyInstance,
    readonly casoDeUso: AtualizarDescricaoTarefa
  ) {
    this.servidor.register(websocket);
    this.servidor.put(
      "/api/v1/tarefa/:idTarefa",
      { websocket: true },
      (socket, req: FastifyRequest<{Body: {data: NovaDesc}}>) => {
        socket.on("message", async (message: string) => {
            const resp = await this.casoDeUso.executar(req.body.data);
            socket.send(JSON.stringify(resp));
          });
      }
    );
  }
}
