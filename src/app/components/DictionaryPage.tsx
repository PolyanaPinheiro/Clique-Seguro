import { useState } from 'react';
import {
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  ArrowLeft,
  Book,
  FileText,
  Smile
} from 'lucide-react';

interface DictionaryOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface DictionaryPageProps {
  onSelectDictionary: (dictionaryId: string) => void;
  onBack: () => void;
}

export function DictionaryPage({ onSelectDictionary, onBack }: DictionaryPageProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  const handleIncreaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
  };

  const handleDecreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  const fontSizeClasses = {
    normal: '',
    large: 'text-[120%]',
    xlarge: 'text-[140%]',
  };

  const contrastClasses = highContrast 
    ? 'bg-black text-white' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const dictionaryOptions: DictionaryOption[] = [
    {
      id: 'palavras',
      title: 'Dicionário de Palavras',
      description: 'Entenda as palavras técnicas do celular de forma simples',
      icon: <FileText className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'icones',
      title: 'Dicionário de Ícones',
      description: 'Conheça o significado de cada símbolo e ícone',
      icon: <Smile className="w-full h-full" strokeWidth={2.5} />
    }
  ];

  return (
    <div className={`min-h-screen ${contrastClasses} ${fontSizeClasses[fontSize]} transition-all duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${highContrast ? 'bg-black border-b-4 border-white' : 'bg-white shadow-md'} px-4 sm:px-8 py-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Back button and Accessibility */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              onClick={onBack}
              className={`flex items-center gap-3 ${
                highContrast 
                  ? 'text-white hover:text-gray-300' 
                  : 'text-gray-700 hover:text-gray-900'
              } transition-colors`}
            >
              <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
              <span className="text-xl sm:text-2xl font-bold">Voltar</span>
            </button>

            {/* Accessibility Controls */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={handleDecreaseFontSize}
                disabled={fontSize === 'normal'}
                className={`${
                  highContrast 
                    ? 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400'
                } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Diminuir tamanho do texto"
              >
                <ZoomOut className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span className="hidden sm:inline">A-</span>
              </button>

              <button
                onClick={handleIncreaseFontSize}
                disabled={fontSize === 'xlarge'}
                className={`${
                  highContrast 
                    ? 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400'
                } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Aumentar tamanho do texto"
              >
                <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span className="hidden sm:inline">A+</span>
              </button>

              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`${
                  highContrast 
                    ? 'bg-white text-black hover:bg-gray-300' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                } px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Alternar alto contraste"
              >
                <Contrast className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span className="hidden sm:inline">Contraste</span>
              </button>

              <button
                onClick={() => alert('Recurso de leitura por voz será ativado')}
                className={`${
                  highContrast 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                } px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center gap-2 text-base sm:text-lg shadow-lg`}
                aria-label="Ativar leitura por voz"
              >
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span className="hidden sm:inline">Ler Texto</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Dictionary Header */}
        <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-gradient-to-br from-indigo-500 to-indigo-600'} rounded-3xl p-8 sm:p-12 text-white text-center mb-12 shadow-2xl`}>
          <div className="flex justify-center mb-6">
            <div className={`${highContrast ? 'bg-white' : 'bg-white/20'} rounded-full p-6 sm:p-8`}>
              <Book className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Dicionário
          </h1>
          <p className="text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
            Aqui você encontra explicações simples para palavras e ícones do celular
          </p>
        </div>

        {/* Dictionary Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {dictionaryOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectDictionary(option.id)}
              className={`${
                highContrast 
                  ? 'bg-gray-900 border-4 border-white hover:bg-gray-800' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-3xl p-8 sm:p-10 shadow-xl transition-all hover:scale-105 group text-left`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                {/* Icon */}
                <div className={`${
                  highContrast 
                    ? 'bg-white' 
                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                } rounded-full p-6 sm:p-8 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center ${
                    highContrast ? 'text-black' : 'text-white'
                  }`}>
                    {option.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-3 leading-tight ${
                    highContrast ? 'text-white' : 'text-gray-800'
                  }`}>
                    {option.title}
                  </h3>
                  <p className={`text-lg sm:text-xl leading-relaxed ${
                    highContrast ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Floating Action Button - Help */}
      <button
        onClick={() => alert('Central de Ajuda: Como podemos ajudar você?')}
        className={`fixed bottom-6 right-6 ${
          highContrast 
            ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
            : 'bg-gradient-to-br from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
        } rounded-full px-6 sm:px-8 py-4 sm:py-5 shadow-2xl hover:scale-110 transition-all flex items-center gap-3 text-lg sm:text-xl font-bold z-50 animate-pulse`}
        aria-label="Precisa de ajuda?"
      >
        <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
        <span className="hidden sm:inline">Precisa de Ajuda?</span>
      </button>
    </div>
  );
}
