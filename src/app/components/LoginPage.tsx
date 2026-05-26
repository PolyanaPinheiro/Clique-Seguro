import { useState } from 'react';
import { LogIn, User, Lock, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onBack: () => void;
  onLogin: (username: string) => void;
  onGoToRegister: () => void;
}

export function LoginPage({ onBack, onLogin, onGoToRegister }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Armazena mensagens de erro do banco
  const [loading, setLoading] = useState(false); // Controla o estado de clique do botão

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Envia os dados para a rota do seu servidor Node.js
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Se o Node/MySQL encontrar o usuário, você entra no sistema
        onLogin(data.username);
      } else {
        // Se as credenciais estiverem erradas (Erro 401)
        setError(data.message || 'Usuário ou senha incorretos.');
      }
    } catch (err) {
      // Se o servidor backend estiver desligado
      setError('Não foi possível conectar ao servidor de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="mb-6 bg-white text-gray-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-3 text-lg shadow-lg"
          disabled={loading}
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          Voltar
        </button>

        {/* Card de Login */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-6">
                <LogIn className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Entrar na Plataforma
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Acesse sua conta para continuar aprendendo
            </p>
          </div>

          {/* Alerta de erro visível na tela caso falhe */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-600 text-lg font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Usuário */}
            <div>
              <label htmlFor="username" className="block text-xl font-bold text-gray-700 mb-3">
                <User className="w-6 h-6 inline mr-2" strokeWidth={2.5} />
                Nome de Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-all"
                placeholder="Digite seu nome de usuário"
                required
                disabled={loading}
              />
            </div>

            {/* Campo de Senha */}
            <div>
              <label htmlFor="password" className="block text-xl font-bold text-gray-700 mb-3">
                <Lock className="w-6 h-6 inline mr-2" strokeWidth={2.5} />
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-all"
                placeholder="Digite sua senha"
                required
                disabled={loading}
              />
            </div>

            {/* Botão de Entrar dinâmico */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-2xl text-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <LogIn className="w-8 h-8" strokeWidth={2.5} />
              {loading ? 'Verificando dados...' : 'Entrar'}
            </button>
          </form>

          {/* Link para Registro */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Ainda não tem uma conta?
            </p>
            <button
              onClick={onGoToRegister}
              disabled={loading}
              className="text-blue-600 hover:text-blue-700 font-bold text-xl underline hover:no-underline transition-all disabled:opacity-50"
            >
              Realizar cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}