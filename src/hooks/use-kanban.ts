import { useCallback, useEffect, useState } from 'react';
import type { ColumnId, Task } from '@/types/kanban';

const STORAGE_KEY = 'kanban.tasks.v1';

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.id === 'string' && typeof t.title === 'string'
    );
  } catch {
    return [];
  }
}

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (column: ColumnId, title: string, description?: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      const task: Task = {
        id: uid(),
        title: trimmed,
        description: description?.trim() || undefined,
        column,
        createdAt: Date.now(),
      };
      setTasks((prev) => [...prev, task]);
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id: string, toColumn: ColumnId, toIndex?: number) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;

      const without = prev.filter((t) => t.id !== id);
      const updated: Task = { ...task, column: toColumn };

      if (toIndex === undefined) {
        return [...without, updated];
      }

      const inTarget = without.filter((t) => t.column === toColumn);
      const others = without.filter((t) => t.column !== toColumn);

      inTarget.splice(toIndex, 0, updated);
      return [...others, ...inTarget];
    });
  }, []);

  return { tasks, addTask, deleteTask, moveTask };
}
