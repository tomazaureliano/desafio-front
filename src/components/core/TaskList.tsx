// components/TaskList.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  currentPage: number;
}

const TAREFAS_POR_PAGE = 10;

export default function TaskList({ tasks, currentPage }: TaskListProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("todas");

  // Filtra as tarefas baseado no estado do botão
  const filteredTasks = useMemo(() => {
    if (statusFilter === "concluidas") return tasks.filter(t => t.completed);
    if (statusFilter === "pendentes") return tasks.filter(t => !t.completed);
    return tasks;
  }, [statusFilter, tasks]);

  // Paginação
  const totalPages = Math.ceil(filteredTasks.length / TAREFAS_POR_PAGE);
  const startIndex = (currentPage - 1) * TAREFAS_POR_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + TAREFAS_POR_PAGE);

  const handleFilterChange = (novoStatus: string) => {
    setStatusFilter(novoStatus);
    router.push(`/tarefas?page=1`);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex gap-2">
        {["todas", "concluidas", "pendentes"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-bold ${
                  task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {task.completed ? "CONCLUÍDA" : "PENDENTE"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">Nenhuma tarefa encontrada.</p>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="border-t pt-6 text-center">
          <button
            onClick={() => router.push(`/tarefas?page=${currentPage < totalPages ? currentPage + 1 : 1}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {currentPage < totalPages ? `Ir para página ${currentPage + 1}` : "Voltar à página 1"}
          </button>
        </div>
      )}
    </div>
  );
}