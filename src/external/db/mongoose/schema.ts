import mongoose, { Document } from "mongoose";

const todoSchema = new mongoose.Schema({
  body: { type: String, required: true },
  completed: { type: Boolean, required: true },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export type TodoMongo = mongoose.InferSchemaType<typeof todoSchema>;
export const TodoModel = mongoose.model<TodoMongo>('Todo', todoSchema);