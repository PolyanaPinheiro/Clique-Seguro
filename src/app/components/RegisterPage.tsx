import { useState } from 'react';
import { UserPlus, User, Lock, Mail, ArrowLeft } from 'lucide-react';

interface RegisterPageProps {
  onBack: () => void;
  onRegister: (username: string, email: string) => void;
  onGoToLogin: () => void;
}

export function RegisterPage({ onBack, onRegister, onGoToLogin }: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    if (username.trim() && email.trim()) {
      onRegister(username.trim(), email.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="mb-6 bg-white text-gray-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-3 text-lg shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          Voltar
        </button>

        {/* Card de Cadastro */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-full p-6">
                <UserPlus className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Criar Conta
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Cadastre-se para começar a aprender
            </p>
          </div>

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
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none transition-all"
                placeholder="Escolha um nome de usuário"
                required
              />
            </div>

            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-xl font-bold text-gray-700 mb-3">
                <Mail className="w-6 h-6 inline mr-2" strokeWidth={2.5} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none transition-all"
                placeholder="Digite seu email"
                required
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
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none transition-all"
                placeholder="Escolha uma senha"
                required
              />
            </div>

            {/* Campo de Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xl font-bold text-gray-700 mb-3">
                <Lock className="w-6 h-6 inline mr-2" strokeWidth={2.5} />
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none transition-all"
                placeholder="Digite a senha novamente"
                required
              />
            </div>

            {/* Botão de Cadastrar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-6 rounded-2xl text-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <UserPlus className="w-8 h-8" strokeWidth={2.5} />
              Criar Conta
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Já tem uma conta?
            </p>
            <button
              onClick={onGoToLogin}
              className="text-blue-600 hover:text-blue-700 font-bold text-xl underline hover:no-underline transition-all"
            >
              Fazer login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
