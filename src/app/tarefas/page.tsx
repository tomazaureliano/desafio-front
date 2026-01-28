"use client";
import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  { id: 1, title: "Criar Homepage", description: "Create wireframes e protótipos", completed: false },
  { id: 2, title: "Organizar banco de dados", description: "Configurar PostgreSQL", completed: true },
  { id: 3, title: "Integrar API", description: "Conectar frontend ao backend", completed: false },
  { id: 4, title: "Implementar autenticação", description: "Configurar login e logout", completed: false },
  { id: 5, title: "Testar aplicação", description: "Escrever testes unitários e de integração", completed: true },
  { id: 6, title: "pegar onibus", description: "as 8 horas", completed: true },
  { id: 7, title: "lavar cabelo", description: "com sabao", completed: false },
  { id: 8, title: "tomar banho", description: "de manhã", completed: true },
  { id: 9, title: "escovar dentes", description: "com colgate", completed: false },
  { id: 10, title: "Fazer compras", description: "No mercado", completed: false },
  { id: 11, title: "Limpar casa", description: "Varrer e passar pano", completed: true },
  { id: 12, title: "Estudar TypeScript", description: "Aprender tipos avançados", completed: false },
  { id: 13, title: "Revisar código", description: "Code review do projeto", completed: true },
  { id: 14, title: "Documentar API", description: "Criar documentação com Swagger", completed: false },
  { id: 15, title: "Deploy em produção", description: "Fazer release da v1.0", completed: false },
  { id: 16, title: "Configurar CI/CD", description: "Setup GitHub Actions", completed: true },
  { id: 17, title: "Otimizar performance", description: "Melhorar velocidade da página", completed: false },
  { id: 18, title: "Implementar temas", description: "Dark mode e light mode", completed: true },
  { id: 19, title: "Adicionar notificações", description: "Toast e push notifications", completed: false },
  { id: 20, title: "Migrar para Next.js 14", description: "Atualizar dependências", completed: false },
];

const TAREFAS_POR_PAGE = 10;

export default function TarefasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // Estado para controlar o filtro: 'todas', 'concluidas' ou 'pendentes'
  const [statusFilter, setStatusFilter] = useState<string>("todas");

  // Filtra as tarefas ANTES de paginar
  const filteredTasks = useMemo(() => {
    if (statusFilter === "concluidas") return mockTasks.filter(t => t.completed);
    if (statusFilter === "pendentes") return mockTasks.filter(t => !t.completed);
    return mockTasks;
  }, [statusFilter]);

  // Lógica de Paginação baseada na lista já filtrada
  const totalPages = Math.ceil(filteredTasks.length / TAREFAS_POR_PAGE);
  const startIndex = (page - 1) * TAREFAS_POR_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + TAREFAS_POR_PAGE);

  const handleFilterChange = (novoStatus: string) => {
    setStatusFilter(novoStatus);
    router.push(`/tarefas?page=1`); // Reseta para a página 1 ao mudar o filtro
  };

  const Navegacao = (nextPage: number) => {
    router.push(`/tarefas?page=${nextPage}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tarefas (Página {page})</h1>

      {/* Botões de Filtro */}
      <div className="flex gap-2 mb-8">
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

      {/* Navegação de Páginas */}
      {totalPages > 1 && (
        <div className="border-t mt-8 pt-6 text-center">
          <button
            onClick={() => Navegacao(page < totalPages ? page + 1 : 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {page < totalPages ? `Ir para página ${page + 1}` : "Voltar à página 1"}
          </button>
        </div>
      )}
    </div>
  );
}