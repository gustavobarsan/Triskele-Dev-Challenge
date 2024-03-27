export interface ITodo {
    body: string;
    completed: boolean;
    completedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }