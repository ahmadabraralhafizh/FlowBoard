import { useState } from 'react';
import type { Column, Task } from '@/types/kanban';
import { cn } from '@/lib/utils';
import { TaskCard } from './TaskCard';
import { AddTaskDialog } from './AddTaskDialog';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  draggingTaskId: string | null;
  dragOverColumn: Column['id'] | null;
  onAddTask: (column: Column['id'], title: string, description?: string) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOverCard: (e: React.DragEvent, taskId: string) => void;
  onDropOnCard: (e: React.DragEvent, taskId: string) => void;
  onDragOverColumn: (e: React.DragEvent, columnId: Column['id']) => void;
  onDropOnColumn: (e: React.DragEvent, columnId: Column['id']) => void;
}

export function KanbanColumn({
  column,
  tasks,
  draggingTaskId,
  dragOverColumn,
  onAddTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDragOverCard,
  onDropOnCard,
  onDragOverColumn,
  onDropOnColumn,
}: KanbanColumnProps) {
  const [dragOverEmpty, setDragOverEmpty] = useState(false);
  const isDragTarget = dragOverColumn === column.id;

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col rounded-2xl border border-border/60 bg-secondary/40 transition-colors duration-200',
        isDragTarget && 'border-primary/40 bg-primary/5'
      )}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverColumn(e, column.id);
        if (tasks.length === 0) setDragOverEmpty(true);
      }}
      onDragLeave={() => setDragOverEmpty(false)}
      onDrop={(e) => {
        setDragOverEmpty(false);
        onDropOnColumn(e, column.id);
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', column.accent)} />
          <h2 className="text-sm font-semibold tracking-tight">
            {column.title}
          </h2>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="scrollbar-thin flex-1 space-y-2.5 overflow-y-auto px-3 pb-3" style={{ maxHeight: 'calc(100vh - 280px)' }}>
        {tasks.length === 0 ? (
          <div
            className={cn(
              'flex min-h-[80px] items-center justify-center rounded-xl border border-dashed text-xs text-muted-foreground transition-colors',
              dragOverEmpty
                ? 'border-primary/50 bg-primary/5 text-primary'
                : 'border-border/50'
            )}
          >
            {dragOverEmpty ? 'Drop here' : 'No tasks yet'}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOverCard={onDragOverCard}
              onDropOnCard={onDropOnCard}
              isDragging={draggingTaskId === task.id}
            />
          ))
        )}
      </div>

      {/* Add task */}
      <div className="px-3 pb-3">
        <AddTaskDialog
          column={column.id}
          columnTitle={column.title}
          onAdd={onAddTask}
        />
      </div>
    </div>
  );
}
