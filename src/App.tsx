import { Navbar } from '@/components/kanban/Navbar';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-2">
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
