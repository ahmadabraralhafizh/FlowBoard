import { useState } from 'react';
import { COLUMNS, type ColumnId, type Task } from '@/types/kanban';
import { useKanban } from '@/hooks/use-kanban';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard() {
  const { tasks, addTask, deleteTask, moveTask } = useKanban();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggingTaskId(task.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOverColumn = (e: React.DragEvent, columnId: ColumnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragOverCard = (e: React.DragEvent, _taskId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnCard = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData('text/plain') || draggingTaskId;
    if (!draggedId || draggedId === targetTaskId) return;

    const targetTask = tasks.find((t) => t.id === targetTaskId);
    if (!targetTask) return;

    const targetIndex = tasks.filter((t) => t.column === targetTask.column).findIndex(
      (t) => t.id === targetTaskId
    );

    moveTask(draggedId, targetTask.column, targetIndex);
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  const handleDropOnColumn = (e: React.DragEvent, columnId: ColumnId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain') || draggingTaskId;
    if (!draggedId) return;
    moveTask(draggedId, columnId);
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.column === column.id)}
            draggingTaskId={draggingTaskId}
            dragOverColumn={dragOverColumn}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOverCard={handleDragOverCard}
            onDropOnCard={handleDropOnCard}
            onDragOverColumn={handleDragOverColumn}
            onDropOnColumn={handleDropOnColumn}
          />
        ))}
      </div>
    </div>
  );
}
