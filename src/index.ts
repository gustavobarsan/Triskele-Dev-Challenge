// Importando os módulos necessários
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import mongoose, { Schema, Document } from "mongoose";
import { Server, Socket } from "socket.io";

// Definindo o tipo para o modelo de tarefa
interface ITodo extends Document {
  body: string;
  completed: boolean;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo o schema do modelo de tarefa
const TodoSchema: Schema = new Schema({
  body: String,
  completed: Boolean,
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Criando o modelo de Tarefa
const Todo = mongoose.model<ITodo>("Todo", TodoSchema);

// Conectando ao MongoDB
mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Criando a instância do servidor Fastify
const app: FastifyInstance = fastify({ logger: true });

// Configurando WebSockets
const server = require("http").createServer(app);
const io = new Server(server, {});

io.on("connection", (socket: Socket) => {
  console.log("Novo cliente conectado");

  // Enviar tarefas atualizadas para o cliente quando houver alterações
  socket.on("updateTasks", async () => {
    const tasks = await Todo.find();
    io.emit("tasksUpdated", tasks);
  });
});

// Configurando CORS
app.register(require("fastify-cors"), {});

// Definindo as rotas da API
app.get("/api/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const tasks = await Todo.find();
    reply.send(tasks);
  } catch (err) {
    reply.status(500).send({ message: err });
  }
});

app.post(
  "/api/tasks",
  async (
    request: FastifyRequest<{ Body: { body: string } }>,
    reply: FastifyReply
  ) => {
    const todo = new Todo({
      body: request.body.body,
      completed: false,
    });

    try {
      const newTodo = await todo.save();
      // Emitir evento de atualização para WebSockets
      io.emit("tasksUpdated", await Todo.find());
      reply.status(201).send(newTodo);
    } catch (err) {
      reply.status(400).send({ message: err });
    }
  }
);

app.put(
  "/api/tasks/:id",
  async (
    request: FastifyRequest<{ Params: { id: string }; Body: { body: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const todo = await Todo.findById(request.params.id);
      if (todo == null) {
        return reply.status(404).send({ message: "Tarefa não encontrada" });
      }

      todo.body = request.body.body;
      todo.updatedAt = new Date();
      const updatedTodo = await todo.save();
      // Emitir evento de atualização para WebSockets
      io.emit("tasksUpdated", await Todo.find());
      reply.send(updatedTodo);
    } catch (err) {
      reply.status(400).send({ message: err });
    }
  }
);

app.delete(
  "/api/tasks/:id",
  async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(request.params.id);
      if (deletedTodo == null) {
        return reply.status(404).send({ message: "Tarefa não encontrada" });
      }
      // Emitir evento de atualização para WebSockets
      io.emit("tasksUpdated", await Todo.find());
      reply.send({ message: "Tarefa excluída com sucesso" });
    } catch (err) {
      reply.status(400).send({ message: err });
    }
  }
);

// Iniciando o servidor
async function start() {
  try {
    await app.ready();
    await server.listen(3000, "0.0.0.0");
    console.log(
      `Servidor rodando em ${server.address().address}:${server.address().port}`
    );
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
}

start();
