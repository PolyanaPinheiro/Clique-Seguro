import { useState } from "react";
import {
  Smartphone,
  MessageCircle,
  Shield,
  Wallet,
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  Book,
  Sparkles,
  User,
  TrendingUp,
} from "lucide-react";
import { TutorialExample } from "./components/TutorialExample";
import {
  CategoryPage,
  categoryTutorialsData,
} from "./components/CategoryPage";
import { DictionaryPage } from "./components/DictionaryPage";
import { WordsDictionary } from "./components/WordsDictionary";
import { IconsDictionary } from "./components/IconsDictionary";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { UserProgressPage } from "./components/UserProgressPage";

type View =
  | "home"
  | "category"
  | "tutorial"
  | "dictionary-menu"
  | "dictionary-words"
  | "dictionary-icons"
  | "login"
  | "register"
  | "user-progress";
type CategoryId =
  | "ferramentas-celular"
  | "comunicacao"
  | "golpes-seguranca"
  | "contas-bancos";

export default function App() {
  const [fontSize, setFontSize] = useState<
    "normal" | "large" | "xlarge"
  >("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId | null>(null);
  const [selectedTutorialId, setSelectedTutorialId] = useState<
    string | null
  >(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Navegação para categoria
  const handleCategoryClick = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView("category");
  };

  // Navegação para tutorial
  const handleTutorialClick = (tutorialId: string) => {
    setSelectedTutorialId(tutorialId);
    setCurrentView("tutorial");
  };

  // Navegação para dicionário
  const handleDictionaryClick = () => {
    setCurrentView("dictionary-menu");
  };

  const handleDictionarySelect = (dictionaryId: string) => {
    if (dictionaryId === "palavras") {
      setCurrentView("dictionary-words");
    } else if (dictionaryId === "icones") {
      setCurrentView("dictionary-icons");
    }
  };

  // Voltar para home
  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedCategory(null);
    setSelectedTutorialId(null);
  };

  // Voltar para categoria
  const handleBackToCategory = () => {
    setCurrentView("category");
    setSelectedTutorialId(null);
  };

  // Voltar para menu de dicionário
  const handleBackToDictionaryMenu = () => {
    setCurrentView("dictionary-menu");
  };

  // Navegação para login
  const handleGoToLogin = () => {
    setCurrentView("login");
  };

  // Navegação para registro
  const handleGoToRegister = () => {
    setCurrentView("register");
  };

  // Navegação para progresso do usuário
  const handleGoToUserProgress = () => {
    if (isLoggedIn) {
      setCurrentView("user-progress");
    } else {
      handleGoToLogin();
    }
  };

  // Fazer login
  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setCurrentView("home");
  };

  // Fazer registro
  const handleRegister = (user: string, email: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setCurrentView("home");
  };

  // Logout
  const handleLogout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setCurrentView("home");
  };

  // Renderizar LoginPage
  if (currentView === "login") {
    return (
      <LoginPage
        onBack={handleBackToHome}
        onLogin={handleLogin}
        onGoToRegister={handleGoToRegister}
      />
    );
  }

  // Renderizar RegisterPage
  if (currentView === "register") {
    return (
      <RegisterPage
        onBack={handleBackToHome}
        onRegister={handleRegister}
        onGoToLogin={handleGoToLogin}
      />
    );
  }

  // Renderizar UserProgressPage
  if (
    currentView === "user-progress" &&
    isLoggedIn &&
    username
  ) {
    return (
      <UserProgressPage
        onBack={handleBackToHome}
        username={username}
        onLogout={handleLogout}
      />
    );
  }

  // Renderizar DictionaryPage se estiver no menu de dicionário
  if (currentView === "dictionary-menu") {
    return (
      <DictionaryPage
        onSelectDictionary={handleDictionarySelect}
        onBack={handleBackToHome}
      />
    );
  }

  // Renderizar WordsDictionary
  if (currentView === "dictionary-words") {
    return (
      <WordsDictionary onBack={handleBackToDictionaryMenu} />
    );
  }

  // Renderizar IconsDictionary
  if (currentView === "dictionary-icons") {
    return (
      <IconsDictionary onBack={handleBackToDictionaryMenu} />
    );
  }

  // Renderizar CategoryPage se estiver na view de categoria
  if (currentView === "category" && selectedCategory) {
    const categoryData = {
      "ferramentas-celular": {
        name: "Ferramentas do Celular",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        icon: (
          <Smartphone
            className="w-full h-full text-blue-600"
            strokeWidth={2.5}
          />
        ),
      },
      comunicacao: {
        name: "Comunicação",
        color: "bg-gradient-to-br from-green-500 to-green-600",
        icon: (
          <MessageCircle
            className="w-full h-full text-green-600"
            strokeWidth={2.5}
          />
        ),
      },
      "golpes-seguranca": {
        name: "Golpes e Segurança",
        color:
          "bg-gradient-to-br from-orange-500 to-orange-600",
        icon: (
          <Shield
            className="w-full h-full text-orange-600"
            strokeWidth={2.5}
          />
        ),
      },
      "contas-bancos": {
        name: "Contas e Bancos",
        color:
          "bg-gradient-to-br from-purple-500 to-purple-600",
        icon: (
          <Wallet
            className="w-full h-full text-purple-600"
            strokeWidth={2.5}
          />
        ),
      },
    };

    const category = categoryData[selectedCategory];
    const tutorials = categoryTutorialsData[selectedCategory];

    return (
      <CategoryPage
        categoryName={category.name}
        categoryColor={category.color}
        categoryIcon={category.icon}
        tutorials={tutorials}
        onSelectTutorial={handleTutorialClick}
        onBack={handleBackToHome}
      />
    );
  }

  // Marcar tutorial como concluído no backend
  const handleTutorialComplete = async (tutorialId: string, tutorialTitle: string) => {
    if (!isLoggedIn || !username || !selectedCategory) return;
    try {
      await fetch('/api/tutorial/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, tutorialId, tutorialTitle, categoryId: selectedCategory }),
      });
    } catch {
      // falha silenciosa
    }
  };

  // Renderizar TutorialPage se estiver na view de tutorial
  if (currentView === "tutorial" && selectedTutorialId) {
    return (
      <TutorialExample
        onBack={handleBackToCategory}
        onComplete={handleTutorialComplete}
        isLoggedIn={isLoggedIn}
        tutorialId={selectedTutorialId}
      />
    );
  }

  const handleIncreaseFontSize = () => {
    if (fontSize === "normal") setFontSize("large");
    else if (fontSize === "large") setFontSize("xlarge");
  };

  const handleDecreaseFontSize = () => {
    if (fontSize === "xlarge") setFontSize("large");
    else if (fontSize === "large") setFontSize("normal");
  };

  const fontSizeClasses = {
    normal: "",
    large: "text-[120%]",
    xlarge: "text-[140%]",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50";

  return (
    <div
      className={`min-h-screen ${contrastClasses} ${fontSizeClasses[fontSize]} transition-all duration-300`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${highContrast ? "bg-black border-b-4 border-white" : "bg-white shadow-md"} px-4 sm:px-8 py-6`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`${highContrast ? "bg-white text-black" : "bg-gradient-to-br from-blue-600 to-purple-600 text-white"} rounded-2xl p-3`}
            >
              <Smartphone
                className="w-8 h-8 sm:w-10 sm:h-10"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Clique Seguro
              </h1>
              <p
                className={`text-sm sm:text-base ${highContrast ? "text-white" : "text-gray-600"}`}
              >
                Aprenda sem medo e com segurança
              </p>
            </div>
          </div>

          {/* Accessibility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleDecreaseFontSize}
              disabled={fontSize === "normal"}
              className={`${
                highContrast
                  ? "bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
              } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
              aria-label="Diminuir tamanho do texto"
            >
              <ZoomOut
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
              <span className="hidden sm:inline">A-</span>
            </button>

            <button
              onClick={handleIncreaseFontSize}
              disabled={fontSize === "xlarge"}
              className={`${
                highContrast
                  ? "bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
              } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
              aria-label="Aumentar tamanho do texto"
            >
              <ZoomIn
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
              <span className="hidden sm:inline">A+</span>
            </button>

            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`${
                highContrast
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
              aria-label="Alternar alto contraste"
            >
              <Contrast
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
              <span className="hidden sm:inline">
                Contraste
              </span>
            </button>

            <button
              onClick={() =>
                alert("Recurso de leitura por voz será ativado")
              }
              className={`${
                highContrast
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
              } px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
              aria-label="Ativar leitura por voz"
            >
              <Volume2
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
              <span className="hidden sm:inline">
                Ler Texto
              </span>
            </button>

            {!isLoggedIn ? (
              <button
                onClick={handleGoToLogin}
                className={`${
                  highContrast
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                } px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Fazer login"
              >
                <User
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  strokeWidth={2.5}
                />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            ) : (
              <button
                onClick={handleGoToUserProgress}
                className={`${
                  highContrast
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                } px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Ver perfil"
              >
                <User
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  strokeWidth={2.5}
                />
                <span className="hidden sm:inline">
                  {username}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section
          className={`${highContrast ? "bg-gray-900 border-4 border-white" : "bg-gradient-to-r from-blue-600 to-purple-600"} rounded-3xl p-8 sm:p-12 text-white text-center mb-12 shadow-2xl`}
        >
          <div className="flex justify-center mb-6">
            <Sparkles
              className="w-16 h-16 sm:w-20 sm:h-20"
              strokeWidth={2}
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
            Aprenda a usar seu celular sem medo
          </h2>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Bem-vindo! Aqui você aprende no seu ritmo, com
            explicações simples e claras. Sem pressa, sem
            complicação.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                alert(
                  "Abrindo guia de como usar a plataforma...",
                )
              }
              className={`${
                highContrast
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              } px-8 sm:px-12 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-3`}
            >
              <Book
                className="w-7 h-7 sm:w-8 sm:h-8"
                strokeWidth={2.5}
              />
              Como Usar a Plataforma
            </button>
            <button
              onClick={handleGoToUserProgress}
              className={`${
                highContrast
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-white text-purple-600 hover:bg-purple-50"
              } px-8 sm:px-12 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-3`}
            >
              <TrendingUp
                className="w-7 h-7 sm:w-8 sm:h-8"
                strokeWidth={2.5}
              />
              Veja seu Progresso
            </button>
          </div>
        </section>

        {/* Support Tools Section */}
        

        {/* Category Cards */}
        <section className="mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${highContrast ? "text-white" : "text-gray-800"}`}
          >
            O que você quer aprender hoje?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Ferramentas do Celular */}
            <button
              onClick={() =>
                handleCategoryClick("ferramentas-celular")
              }
              className={`${
                highContrast
                  ? "bg-blue-900 border-4 border-blue-400 hover:bg-blue-800"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              } text-white rounded-3xl p-8 sm:p-10 transition-all shadow-2xl hover:scale-105 text-left group`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div
                  className={`${highContrast ? "bg-blue-400" : "bg-white"} rounded-full p-6 sm:p-8 group-hover:scale-110 transition-transform`}
                >
                  <Smartphone
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${highContrast ? "text-black" : "text-blue-600"}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Ferramentas do Celular
                  </h3>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    Aprenda a usar a câmera, calculadora,
                    lanterna e muito mais
                  </p>
                </div>
              </div>
            </button>

            {/* Comunicação */}
            <button
              onClick={() => handleCategoryClick("comunicacao")}
              className={`${
                highContrast
                  ? "bg-green-900 border-4 border-green-400 hover:bg-green-800"
                  : "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              } text-white rounded-3xl p-8 sm:p-10 transition-all shadow-2xl hover:scale-105 text-left group`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div
                  className={`${highContrast ? "bg-green-400" : "bg-white"} rounded-full p-6 sm:p-8 group-hover:scale-110 transition-transform`}
                >
                  <MessageCircle
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${highContrast ? "text-black" : "text-green-600"}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Comunicação
                  </h3>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    WhatsApp, ligações, mensagens e
                    videochamadas
                  </p>
                </div>
              </div>
            </button>

            {/* Golpes e Segurança */}
            <button
              onClick={() =>
                handleCategoryClick("golpes-seguranca")
              }
              className={`${
                highContrast
                  ? "bg-orange-900 border-4 border-orange-400 hover:bg-orange-800"
                  : "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              } text-white rounded-3xl p-8 sm:p-10 transition-all shadow-2xl hover:scale-105 text-left group`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div
                  className={`${highContrast ? "bg-orange-400" : "bg-white"} rounded-full p-6 sm:p-8 group-hover:scale-110 transition-transform`}
                >
                  <Shield
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${highContrast ? "text-black" : "text-orange-600"}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Golpes e Segurança
                  </h3>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    Proteja-se de fraudes e use seu celular com
                    segurança
                  </p>
                </div>
              </div>
            </button>

            {/* Contas e Bancos */}
            <button
              onClick={() =>
                handleCategoryClick("contas-bancos")
              }
              className={`${
                highContrast
                  ? "bg-purple-900 border-4 border-purple-400 hover:bg-purple-800"
                  : "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              } text-white rounded-3xl p-8 sm:p-10 transition-all shadow-2xl hover:scale-105 text-left group`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div
                  className={`${highContrast ? "bg-purple-400" : "bg-white"} rounded-full p-6 sm:p-8 group-hover:scale-110 transition-transform`}
                >
                  <Wallet
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${highContrast ? "text-black" : "text-purple-600"}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Contas e Bancos
                  </h3>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    Aplicativos bancários, Pix e compras online
                  </p>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section
          className={`${highContrast ? "bg-gray-900 border-4 border-white" : "bg-white"} rounded-3xl p-8 sm:p-10 shadow-xl mb-12`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${highContrast ? "text-white" : "text-gray-800"}`}
          >
            Ferramentas de Apoio
          </h2>

          <div className="flex justify-center">
            {/* Dicionário */}
            <button
              onClick={handleDictionaryClick}
              className={`${
                highContrast
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700"
              } rounded-2xl p-6 sm:p-8 transition-all shadow-lg hover:scale-105 group max-w-xl w-full`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${highContrast ? "bg-black text-white" : "bg-white/20"} rounded-xl p-4 group-hover:scale-110 transition-transform`}
                >
                  <Book
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Dicionário
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Palavras e ícones explicados de forma
                    simples
                  </p>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Action Button - Help */}
      <button
        onClick={() =>
          alert("Central de Ajuda: Como podemos ajudar você?")
        }
        className={`fixed bottom-6 right-6 ${
          highContrast
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-gradient-to-br from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
        } rounded-full px-6 sm:px-8 py-4 sm:py-5 shadow-2xl hover:scale-110 transition-all flex items-center gap-3 text-lg sm:text-xl font-bold z-50 animate-pulse`}
        aria-label="Precisa de ajuda?"
      >
        <HelpCircle
          className="w-7 h-7 sm:w-8 sm:h-8"
          strokeWidth={2.5}
        />
        <span className="hidden sm:inline">
          Precisa de Ajuda?
        </span>
      </button>
    </div>
  );
}