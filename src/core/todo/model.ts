export interface ITodo {
    id?: number;
    body: string;
    completed: boolean;
    completedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }