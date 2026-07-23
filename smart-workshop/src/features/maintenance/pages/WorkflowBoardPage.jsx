import { useState } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import KanbanBoard from '../components/KanbanBoard';
import EMEWorkflowPipeline from '../components/EMEWorkflowPipeline';
import { Layers, Kanban } from 'lucide-react';

export default function WorkflowBoardPage() {
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' | 'kanban'

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Live Workshop Workflow Center</h1>
            <p className="text-sm text-gray-500 mt-1">Multi-Group EME operational pipeline and drag-and-drop repair stages.</p>
          </div>

          <div className="flex bg-white p-1 rounded-lg border border-border shadow-xs shrink-0">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded font-bold text-xs transition-all ${
                viewMode === 'pipeline' ? 'bg-primary text-white shadow-xs' : 'text-gray-600 hover:text-olive'
              }`}
            >
              <Layers size={16} /> EME Multi-Group Pipeline
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded font-bold text-xs transition-all ${
                viewMode === 'kanban' ? 'bg-primary text-white shadow-xs' : 'text-gray-600 hover:text-olive'
              }`}
            >
              <Kanban size={16} /> Kanban Stage Board
            </button>
          </div>
        </div>

        {viewMode === 'pipeline' ? <EMEWorkflowPipeline /> : <KanbanBoard />}
      </div>
    </PageTransition>
  );
}