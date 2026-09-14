export type ColumnId = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  column: ColumnId;
  createdAt: number;
}

export interface Column {
  id: ColumnId;
  title: string;
  accent: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', accent: 'bg-slate-400' },
  { id: 'doing', title: 'In Progress', accent: 'bg-blue-500' },
  { id: 'done', title: 'Done', accent: 'bg-emerald-500' },
];
