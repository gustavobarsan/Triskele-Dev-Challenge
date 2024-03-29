import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { TodoMongo } from "./schema";
import { RepositorioTodo, StatusTarefa } from "../../../core/todo/repository";
import { ITodo } from "../../../core/todo/model";

interface TodoDocument extends TodoMongo, Document {}

const todoSchema = new mongoose.Schema({
  body: { type: String, required: true },
  completed: { type: Boolean, required: true },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export class RepositorioTodoMongo implements RepositorioTodo {
  private mongoClientTodo: Model<TodoDocument>;

  constructor() {
    mongoose.connect(process.env.MONGO_URL!);
    this.mongoClientTodo = mongoose.model<TodoDocument>("todo", todoSchema);
  }

  async atualizarDescricaoTarefa(
    idTarefa: number,
    novaDesc: string
  ): Promise<any> {
    await this.mongoClientTodo.updateOne({ novaDesc }).where({ id: idTarefa });
    const resp = await this.mongoClientTodo.findById(idTarefa);
    return resp?.toJSON().body!;
  }
  async atualizarStatusTarefa(idTarefa: number, novoStatus: any): Promise<any> {
    await this.mongoClientTodo
      .updateOne({ novoStatus })
      .where({ id: idTarefa });
    const resp = await this.mongoClientTodo.findById(
      new Types.ObjectId(idTarefa)
    );
    return resp!;
  }
  async completarTarefasEmLote(listaIds: number[]): Promise<any> {
    const idsConvertidos = listaIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const filtro = { _id: { $in: idsConvertidos } };
    const update = { $set: { completed: true } };
    await this.mongoClientTodo.updateMany(filtro, update);
    const resp = this.mongoClientTodo.find(filtro);
    return resp;
  }
  async criarTarefa(tarefa: ITodo): Promise<ITodo> {
    const resp: ITodo = await this.mongoClientTodo.create(tarefa);
    return resp;
  }
  async deletarTarefa(idTarefa: number): Promise<void> {
    await this.mongoClientTodo.deleteOne(new mongoose.Types.ObjectId(idTarefa));
  }
  async deletarTarefasEmLote(listaIdTarefas: number[]): Promise<void> {
    const idsConvertidos = listaIdTarefas.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const filtro = { _id: { $in: idsConvertidos } };
    await this.mongoClientTodo.deleteMany(filtro);
  }
  async listarTarefas(): Promise<ITodo[]> {
    return await this.mongoClientTodo.find()
  }
  async obterQntDeTarefasPenCon(): Promise<any> {
    const con = await this.mongoClientTodo.find().where({completed: true})
    const pen = await this.mongoClientTodo.find().where({completed: false}) 

    return {
        concluidos: con.length,
        pendentes:  pen.length
    }
  }
}
