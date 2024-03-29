import { AtualizarDescricaoTarefaController } from "./adapters/AtualizarDescricaoTarefaController";
import { AtualizarStatusTarefaController } from "./adapters/AtualizarStatusTarefaController";
import { CompletarTarefasEmLoteController } from "./adapters/CompletarTarefasEmLoteController";
import { DeletarTarefaController } from "./adapters/DeletarTarefaControler";
import { DeletarTarefasEmLoteController } from "./adapters/DeletarTarefasEmLoteController";
import { ObterQntDeTarefasPenConController } from "./adapters/ObterQntDeTarefasPenConController";
import { PostarTarefaController } from "./adapters/PostarTarefaController";
import { AtualizarDescricaoTarefa } from "./core/todo/service/AtualizarDescricaoTarefa";
import { AtualizarStatusTarefa } from "./core/todo/service/AtualizarStatusTarefa";
import { CompletarTarefasEmLote } from "./core/todo/service/CompletarTarefasEmLote";
import { CriarTarefa } from "./core/todo/service/CriarTarefa";
import { DeletarTarefa } from "./core/todo/service/DeletarTarefa";
import { DeletarTarefaEmLote } from "./core/todo/service/DeletarTarefasEmLote";
import { ObterQntDeTarefasPenCon } from "./core/todo/service/ObterQntDeTarefasPenCon";
import { app } from "./external/api/fastify";
import { RepositorioTodoMongo } from "./external/db/mongoose/RepositorioTodoMongo";

const repositorioTodo = new RepositorioTodoMongo();

const criarTarefa = new CriarTarefa(repositorioTodo);
new PostarTarefaController(app, criarTarefa);

const atualizarDescricaoTarefa = new AtualizarDescricaoTarefa(repositorioTodo);
new AtualizarDescricaoTarefaController(app, atualizarDescricaoTarefa);

const atualizarStatusTarefa = new AtualizarStatusTarefa(repositorioTodo);
new AtualizarStatusTarefaController(app, atualizarStatusTarefa);

const completarTarefasEmLote = new CompletarTarefasEmLote(repositorioTodo);
new CompletarTarefasEmLoteController(app, completarTarefasEmLote);

const deletarTarefa = new DeletarTarefa(repositorioTodo);
new DeletarTarefaController(app, deletarTarefa);

const deletarTarefasEmLote = new DeletarTarefaEmLote(repositorioTodo);
new DeletarTarefasEmLoteController(app, deletarTarefasEmLote);

const obterQntDeTarefasPenCon = new ObterQntDeTarefasPenCon(repositorioTodo);
new ObterQntDeTarefasPenConController(app, obterQntDeTarefasPenCon);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
