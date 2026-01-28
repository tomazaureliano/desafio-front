// app/tarefas/page.tsx
import TaskList from "@/components/core/TaskList"; 

const mockTasks = [
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

export default function TarefasPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tarefas (Página {page})</h1>
      
      {/* Chamamos o componente cliente passando as props */}
      <TaskList tasks={mockTasks} currentPage={page} />
    </div>
  );
}