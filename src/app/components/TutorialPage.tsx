import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  CheckCircle,
  Camera,
  Circle
} from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  tips?: string;
  icon: React.ReactNode;
  interactiveImage?: string;
  imageHotspots?: Array<{
    x: number; // porcentagem da posição X
    y: number; // porcentagem da posição Y
    label: string;
    pulse?: boolean;
  }>;
}

interface TutorialPageProps {
  categoryName: string;
  categoryColor: string;
  tutorialTitle: string;
  steps: TutorialStep[];
  onBack: () => void;
}

export function TutorialPage({ 
  categoryName, 
  categoryColor, 
  tutorialTitle, 
  steps,
  onBack 
}: TutorialPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleIncreaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
  };

  const handleDecreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      // Marcar passo atual como completo
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMarkComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const fontSizeClasses = {
    normal: '',
    large: 'text-[120%]',
    xlarge: 'text-[140%]',
  };

  const contrastClasses = highContrast 
    ? 'bg-black text-white' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`min-h-screen ${contrastClasses} ${fontSizeClasses[fontSize]} transition-all duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${highContrast ? 'bg-black border-b-4 border-white' : 'bg-white shadow-md'} px-4 sm:px-8 py-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Logo and Accessibility */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              onClick={onBack}
              className={`flex items-center gap-3 ${
                highContrast 
                  ? 'text-white hover:text-gray-300' 
                  : 'text-gray-700 hover:text-gray-900'
              } transition-colors`}
            >
              <Home className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
              <span className="text-xl sm:text-2xl font-bold">Voltar ao Início</span>
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
                <span className="hidden sm:inline">Ler Passo</span>
              </button>
            </div>
          </div>

          {/* Tutorial Info */}
          <div className="text-center">
            <p className={`text-lg sm:text-xl mb-2 ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
              {categoryName}
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              {tutorialTitle}
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className={`${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-6 sm:h-8 overflow-hidden`}>
              <div 
                className={`h-full ${highContrast ? 'bg-yellow-400' : categoryColor} transition-all duration-500 flex items-center justify-end pr-3`}
                style={{ width: `${progress}%` }}
              >
                <span className={`text-sm sm:text-base font-bold ${highContrast ? 'text-black' : 'text-white'}`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <p className={`text-center mt-3 text-lg sm:text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-700'}`}>
              Passo {currentStep + 1} de {steps.length}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Step Content Card */}
        <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-8 sm:p-12 shadow-2xl mb-8`}>
          {/* Step Number Badge */}
          <div className="flex justify-center mb-8">
            <div className={`${highContrast ? 'bg-yellow-400 text-black' : categoryColor + ' text-white'} rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-xl`}>
              {currentStep + 1}
            </div>
          </div>

          {/* Step Icon */}
          <div className="flex justify-center mb-8">
            <div className={`${highContrast ? 'bg-white text-black' : 'bg-gradient-to-br from-gray-100 to-gray-200'} rounded-3xl p-8 sm:p-10`}>
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                {currentStepData.icon}
              </div>
            </div>
          </div>

          {/* Step Title */}
          <h2 className={`text-3xl sm:text-5xl font-bold text-center mb-8 leading-tight ${highContrast ? 'text-white' : 'text-gray-800'}`}>
            {currentStepData.title}
          </h2>

          {/* Step Description */}
          <div className={`${highContrast ? 'bg-black border-4 border-white' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-2xl p-6 sm:p-8 mb-8`}>
            <p className={`text-xl sm:text-3xl leading-relaxed ${highContrast ? 'text-white' : 'text-gray-800'}`}>
              {currentStepData.description}
            </p>
          </div>

          {/* Tips Section */}
          {currentStepData.tips && (
            <div className={`${highContrast ? 'bg-yellow-900 border-4 border-yellow-400' : 'bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-300'} rounded-2xl p-6 sm:p-8 mb-8`}>
              <div className="flex items-start gap-4">
                <div className={`${highContrast ? 'bg-yellow-400 text-black' : 'bg-amber-500 text-white'} rounded-full p-3 flex-shrink-0`}>
                  <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${highContrast ? 'text-yellow-400' : 'text-amber-800'}`}>
                    💡 Dica Importante
                  </h3>
                  <p className={`text-lg sm:text-2xl leading-relaxed ${highContrast ? 'text-white' : 'text-amber-900'}`}>
                    {currentStepData.tips}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mark as Complete Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleMarkComplete}
              disabled={completedSteps.includes(currentStep)}
              className={`${
                completedSteps.includes(currentStep)
                  ? highContrast 
                    ? 'bg-gray-700 text-gray-500' 
                    : 'bg-green-100 text-green-800 border-4 border-green-500'
                  : highContrast 
                    ? 'bg-white text-black hover:bg-gray-300' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
              } px-8 sm:px-12 py-4 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-xl flex items-center gap-3`}
            >
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
              {completedSteps.includes(currentStep) ? 'Passo Concluído!' : 'Marcar como Concluído'}
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className={`${
                highContrast 
                  ? 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500' 
                  : 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500'
              } px-8 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 disabled:cursor-not-allowed`}
            >
              <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
              Passo Anterior
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className={`${
                highContrast 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500' 
                  : categoryColor + ' text-white hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500'
              } px-8 py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 disabled:cursor-not-allowed`}
            >
              Próximo Passo
              <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </button>
          </div>

          {/* Completion Message */}
          {currentStep === steps.length - 1 && (
            <div className={`${highContrast ? 'bg-green-900 border-4 border-green-400' : 'bg-gradient-to-br from-green-500 to-emerald-500'} rounded-2xl p-8 sm:p-10 mt-8 text-center text-white`}>
              <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6" strokeWidth={2} />
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Parabéns! Você chegou ao final! 🎉
              </h3>
              <p className="text-xl sm:text-2xl leading-relaxed mb-6">
                Continue praticando para ficar cada vez melhor!
              </p>
              <button
                onClick={onBack}
                className={`${
                  highContrast 
                    ? 'bg-white text-black hover:bg-gray-300' 
                    : 'bg-white text-green-600 hover:bg-green-50'
                } px-8 sm:px-12 py-4 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-xl inline-flex items-center gap-3`}
              >
                <Home className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
                Voltar à Página Inicial
              </button>
            </div>
          )}
        </div>

        {/* Steps Overview */}
        <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-8 shadow-xl`}>
          <h3 className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${highContrast ? 'text-white' : 'text-gray-800'}`}>
            Todos os Passos
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStep(index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`${
                  index === currentStep
                    ? highContrast
                      ? 'bg-yellow-400 text-black border-4 border-white'
                      : categoryColor + ' text-white'
                    : highContrast
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } rounded-2xl p-4 sm:p-6 transition-all flex items-center gap-4 text-left`}
              >
                <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full ${
                  completedSteps.includes(index)
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                      ? highContrast
                        ? 'bg-black text-yellow-400'
                        : 'bg-white/30 text-white'
                      : highContrast
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-300 text-gray-600'
                } flex items-center justify-center font-bold text-xl sm:text-2xl`}>
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-2xl font-bold leading-tight">
                    {step.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>
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