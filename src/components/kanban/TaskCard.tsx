import { useRef, useState } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Task } from '@/types/kanban';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOverCard: (e: React.DragEvent, taskId: string) => void;
  onDropOnCard: (e: React.DragEvent, taskId: string) => void;
  isDragging: boolean;
}

export function TaskCard({
  task,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragOverCard,
  onDropOnCard,
  isDragging,
}: TaskCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => setConfirmDelete(true), 1200);
  };
  const handleMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setConfirmDelete(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOverCard(e, task.id)}
      onDrop={(e) => onDropOnCard(e, task.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative cursor-grab rounded-xl border border-border/70 bg-card p-3.5 shadow-sm transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing',
        isDragging && 'opacity-40 ring-2 ring-primary/40'
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70" />
        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-medium leading-snug">
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 break-words text-xs leading-relaxed text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className={cn(
            'shrink-0 rounded-md p-1 text-muted-foreground transition-all duration-200',
            'hover:bg-destructive/10 hover:text-destructive',
            confirmDelete
              ? 'opacity-100 bg-destructive/10 text-destructive'
              : 'opacity-0 group-hover:opacity-100'
          )}
          aria-label="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
