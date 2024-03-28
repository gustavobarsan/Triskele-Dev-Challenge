import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ObterQntDeTarefasPenCon } from "../core/todo/service/ObterQntDeTarefasPenCon";

export class ObterQntDeTarefasPenConController {
    constructor(
        readonly servidor: FastifyInstance,
        readonly casoDeUso: ObterQntDeTarefasPenCon
    ){
        this.servidor.get("/api/v1/tarefa", async (
            request: FastifyRequest,
            reply: FastifyReply            
        ) => {
            const resp = await this.casoDeUso.executar();
            return reply.status(200).send({
                mensagem: "Número total de tarefas pendentes e concluídas",
                dados: resp
            })
        })
    }
}