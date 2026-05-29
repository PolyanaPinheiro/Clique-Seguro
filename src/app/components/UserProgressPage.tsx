import { useEffect, useState } from 'react';
import { ArrowLeft, User, Trophy, Book, CheckCircle, LogOut, Loader2 } from 'lucide-react';

interface CategoryProgress {
  id: string;
  name: string;
  completed: number;
  total: number;
  color: string;
}

interface RecentCompletion {
  id: string;
  title: string;
  category: string;
  date: string;
}

interface ProgressData {
  totalTutorials: number;
  completedTutorials: number;
  categories: CategoryProgress[];
  recentCompletions: RecentCompletion[];
}

interface UserProgressPageProps {
  onBack: () => void;
  username: string;
  onLogout: () => void;
}

export function UserProgressPage({ onBack, username, onLogout }: UserProgressPageProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress/${encodeURIComponent(username)}`);
        const data = await response.json();
        if (data.success) {
          setProgress(data);
        } else {
          setError('Não foi possível carregar o progresso.');
        }
      } catch {
        setError('Erro ao conectar com o servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [username]);

  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
    };
    return map[color] || 'bg-gray-500';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const progressPercentage = progress
    ? Math.round((progress.completedTutorials / progress.totalTutorials) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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

        <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-2xl mb-8">
          {/* Perfil */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-8">
                <User className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">Olá, {username}!</h1>
            <p className="text-xl sm:text-2xl text-gray-600">Veja seu progresso de aprendizado</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" strokeWidth={2} />
              <p className="text-xl text-gray-600 font-bold">Carregando seu progresso...</p>
            </div>
          )}

          {/* Erro */}
          {!loading && error && (
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center text-red-600 text-xl font-bold">
              {error}
            </div>
          )}

          {/* Dados reais */}
          {!loading && progress && (
            <>
              {/* Progresso Geral */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Trophy className="w-12 h-12 text-yellow-500" strokeWidth={2.5} />
                  <h2 className="text-3xl font-bold text-gray-800">Progresso Geral</h2>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xl font-bold text-gray-700">
                      {progress.completedTutorials} de {progress.totalTutorials} tutoriais completos
                    </span>
                    <span className="text-xl font-bold text-blue-600">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-6">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-6 rounded-full transition-all duration-700"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                {progress.completedTutorials === 0 && (
                  <p className="text-lg text-gray-500 mt-2">
                    Comece um tutorial para registrar seu progresso aqui!
                  </p>
                )}
              </div>

              {/* Progresso por Categoria */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Book className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
                  <h2 className="text-3xl font-bold text-gray-800">Progresso por Categoria</h2>
                </div>
                <div className="space-y-6">
                  {progress.categories.map((cat) => {
                    const pct = Math.round((cat.completed / cat.total) * 100);
                    return (
                      <div key={cat.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex justify-between mb-3">
                          <span className="text-xl font-bold text-gray-700">{cat.name}</span>
                          <span className="text-xl font-bold text-gray-600">{cat.completed}/{cat.total}</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-4">
                          <div
                            className={`${getColorClass(cat.color)} h-4 rounded-full transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Últimos tutoriais concluídos */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2.5} />
                  <h2 className="text-3xl font-bold text-gray-800">Últimos Tutoriais Completos</h2>
                </div>
                {progress.recentCompletions.length === 0 ? (
                  <p className="text-xl text-gray-500 text-center py-8">
                    Nenhum tutorial concluído ainda. Vamos começar?
                  </p>
                ) : (
                  <div className="space-y-4">
                    {progress.recentCompletions.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-green-50 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" strokeWidth={2.5} />
                          <span className="text-xl font-bold text-gray-700">{item.title}</span>
                        </div>
                        <span className="text-base text-gray-500 font-medium whitespace-nowrap ml-4">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
