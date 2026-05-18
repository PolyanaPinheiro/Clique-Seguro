import { ArrowLeft, User, Trophy, Book, CheckCircle, Circle, LogOut } from 'lucide-react';

interface UserProgressPageProps {
  onBack: () => void;
  username: string;
  onLogout: () => void;
}

export function UserProgressPage({ onBack, username, onLogout }: UserProgressPageProps) {
  // Dados de exemplo de progresso do usuário
  const userProgress = {
    totalTutorials: 24,
    completedTutorials: 8,
    categories: [
      { name: 'Ferramentas do Celular', completed: 3, total: 6, color: 'blue' },
      { name: 'Comunicação', completed: 2, total: 6, color: 'green' },
      { name: 'Golpes e Segurança', completed: 2, total: 6, color: 'orange' },
      { name: 'Contas e Bancos', completed: 1, total: 6, color: 'purple' },
    ],
    recentCompletions: [
      'Como Fazer uma Ligação',
      'Como Enviar uma Mensagem no WhatsApp',
      'Como Tirar uma Foto',
    ]
  };

  const progressPercentage = Math.round((userProgress.completedTutorials / userProgress.totalTutorials) * 100);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header com Voltar e Sair */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-white text-gray-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-3 text-lg shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            Voltar
          </button>

          <button
            onClick={onLogout}
            className="bg-red-500 text-white hover:bg-red-600 px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-3 text-lg shadow-lg"
          >
            <LogOut className="w-6 h-6" strokeWidth={2.5} />
            Sair
          </button>
        </div>

        {/* Card de Perfil */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-2xl mb-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-8">
                <User className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
              Olá, {username}!
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Veja seu progresso de aprendizado
            </p>
          </div>

          {/* Progresso Geral */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" strokeWidth={2.5} />
              <h2 className="text-3xl font-bold text-gray-800">Progresso Geral</h2>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xl font-bold text-gray-700">
                  {userProgress.completedTutorials} de {userProgress.totalTutorials} tutoriais completos
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-6">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-6 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Progresso por Categoria */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Book className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
              <h2 className="text-3xl font-bold text-gray-800">Progresso por Categoria</h2>
            </div>

            <div className="space-y-6">
              {userProgress.categories.map((category, index) => {
                const categoryPercentage = Math.round((category.completed / category.total) * 100);
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between mb-3">
                      <span className="text-xl font-bold text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-xl font-bold text-gray-600">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className={`${getColorClasses(category.color)} h-4 rounded-full transition-all`}
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tutoriais Recentes Concluídos */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2.5} />
              <h2 className="text-3xl font-bold text-gray-800">Últimos Tutoriais Completos</h2>
            </div>

            <div className="space-y-4">
              {userProgress.recentCompletions.map((tutorial, index) => (
                <div key={index} className="flex items-center gap-4 bg-green-50 rounded-xl p-6">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-xl font-bold text-gray-700">{tutorial}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
