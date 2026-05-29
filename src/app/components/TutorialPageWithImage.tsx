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
  CheckCircle
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

interface TutorialPageWithImageProps {
  categoryName: string;
  categoryColor: string;
  tutorialTitle: string;
  steps: TutorialStep[];
  onBack: () => void;
  onComplete?: () => void;
}

export function TutorialPageWithImage({ 
  categoryName, 
  categoryColor, 
  tutorialTitle, 
  steps,
  onBack,
  onComplete
}: TutorialPageWithImageProps) {
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
    const newCompleted = completedSteps.includes(currentStep)
      ? completedSteps
      : [...completedSteps, currentStep];
    setCompletedSteps(newCompleted);
    // Se marcou o último passo, dispara onComplete
    if (currentStep === steps.length - 1 && onComplete) {
      onComplete();
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

      {/* Main Content - Two Columns */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Tutorial Steps */}
          <div className="space-y-8">
            {/* Step Content Card */}
            <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-10 shadow-2xl`}>
              {/* Step Number Badge */}
              <div className="flex justify-center mb-6">
                <div className={`${highContrast ? 'bg-yellow-400 text-black' : categoryColor + ' text-white'} rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-xl`}>
                  {currentStep + 1}
                </div>
              </div>

              {/* Step Icon */}
              <div className="flex justify-center mb-6">
                <div className={`${highContrast ? 'bg-white text-black' : 'bg-gradient-to-br from-gray-100 to-gray-200'} rounded-3xl p-6 sm:p-8`}>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                    {currentStepData.icon}
                  </div>
                </div>
              </div>

              {/* Step Title */}
              <h2 className={`text-2xl sm:text-4xl font-bold text-center mb-6 leading-tight ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                {currentStepData.title}
              </h2>

              {/* Step Description */}
              <div className={`${highContrast ? 'bg-black border-4 border-white' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-2xl p-6 sm:p-8 mb-6`}>
                <p className={`text-lg sm:text-2xl leading-relaxed ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                  {currentStepData.description}
                </p>
              </div>

              {/* Tips Section */}
              {currentStepData.tips && (
                <div className={`${highContrast ? 'bg-yellow-900 border-4 border-yellow-400' : 'bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-300'} rounded-2xl p-6 sm:p-8 mb-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`${highContrast ? 'bg-yellow-400 text-black' : 'bg-amber-500 text-white'} rounded-full p-3 flex-shrink-0`}>
                      <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${highContrast ? 'text-yellow-400' : 'text-amber-800'}`}>
                        💡 Dica Importante
                      </h3>
                      <p className={`text-base sm:text-xl leading-relaxed ${highContrast ? 'text-white' : 'text-amber-900'}`}>
                        {currentStepData.tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mark as Complete Button */}
              <div className="flex justify-center mb-6">
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
                  } px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all shadow-xl flex items-center gap-3`}
                >
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                  {completedSteps.includes(currentStep) ? 'Passo Concluído!' : 'Marcar como Concluído'}
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className={`${
                    highContrast 
                      ? 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500' 
                      : 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500'
                  } px-4 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  Anterior
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStep === steps.length - 1}
                  className={`${
                    highContrast 
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500' 
                      : categoryColor + ' text-white hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500'
                  } px-4 py-4 sm:py-5 rounded-2xl text-base sm:text-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
                >
                  Próximo
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </button>
              </div>

              {/* Completion Message */}
              {currentStep === steps.length - 1 && (
                <div className={`${highContrast ? 'bg-green-900 border-4 border-green-400' : 'bg-gradient-to-br from-green-500 to-emerald-500'} rounded-2xl p-6 sm:p-8 mt-6 text-center text-white`}>
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" strokeWidth={2} />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Parabéns! Você chegou ao final! 🎉
                  </h3>
                  <p className="text-lg sm:text-xl leading-relaxed mb-4">
                    Continue praticando para ficar cada vez melhor!
                  </p>
                  <button
                    onClick={onBack}
                    className={`${
                      highContrast 
                        ? 'bg-white text-black hover:bg-gray-300' 
                        : 'bg-white text-green-600 hover:bg-green-50'
                    } px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all shadow-xl inline-flex items-center gap-3`}
                  >
                    <Home className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                    Voltar à Página Inicial
                  </button>
                </div>
              )}
            </div>

            {/* Steps Overview - Mobile Only */}
            <div className={`lg:hidden ${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-8 shadow-xl`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-4 text-center ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                Todos os Passos
              </h3>
              <div className="grid grid-cols-1 gap-3">
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
                    } rounded-2xl p-4 transition-all flex items-center gap-3 text-left`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${
                      completedSteps.includes(index)
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                          ? highContrast
                            ? 'bg-black text-yellow-400'
                            : 'bg-white/30 text-white'
                          : highContrast
                            ? 'bg-gray-700 text-gray-400'
                            : 'bg-gray-300 text-gray-600'
                    } flex items-center justify-center font-bold text-lg`}>
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold leading-tight">
                        {step.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-8 shadow-2xl`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-6 text-center ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                Visualização Interativa
              </h3>
              
              {currentStepData.interactiveImage ? (
                <div className="relative">
                  {/* Interactive Image Container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={currentStepData.interactiveImage} 
                      alt={`Passo ${currentStep + 1} - ${currentStepData.title}`}
                      className="w-full h-auto"
                    />
                    
                    {/* Hotspots */}
                    {currentStepData.imageHotspots?.map((hotspot, index) => (
                      <div
                        key={index}
                        className="absolute"
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {/* Pulse Circle */}
                        <div className={`relative ${hotspot.pulse !== false ? 'animate-ping' : ''}`}>
                          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-75"></div>
                        </div>
                        
                        {/* Main Circle */}
                        <div className="relative">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-400 border-4 border-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <span className="text-black font-bold text-lg sm:text-xl">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        
                        {/* Label */}
                        {hotspot.label && (
                          <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 ${
                            highContrast 
                              ? 'bg-yellow-400 text-black' 
                              : 'bg-black text-white'
                          } px-4 py-2 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap shadow-xl`}>
                            {hotspot.label}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  {currentStepData.imageHotspots && currentStepData.imageHotspots.length > 0 && (
                    <div className={`mt-6 ${
                      highContrast 
                        ? 'bg-black border-4 border-white' 
                        : 'bg-gradient-to-br from-blue-50 to-purple-50'
                    } rounded-2xl p-4 sm:p-6`}>
                      <h4 className={`text-lg sm:text-xl font-bold mb-3 ${
                        highContrast ? 'text-white' : 'text-gray-800'
                      }`}>
                        Pontos de Atenção:
                      </h4>
                      <ul className="space-y-2">
                        {currentStepData.imageHotspots.map((hotspot, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <span className={`text-base sm:text-lg leading-relaxed ${
                              highContrast ? 'text-white' : 'text-gray-700'
                            }`}>
                              {hotspot.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${
                  highContrast 
                    ? 'bg-black border-4 border-gray-700' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                } rounded-2xl p-12 text-center`}>
                  <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    {currentStepData.icon}
                  </div>
                  <p className={`text-lg sm:text-xl ${
                    highContrast ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Imagem interativa em breve
                  </p>
                </div>
              )}
            </div>

            {/* Steps Overview - Desktop Only */}
            <div className={`hidden lg:block mt-8 ${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 shadow-xl`}>
              <h3 className={`text-xl font-bold mb-4 text-center ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                Todos os Passos
              </h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStep(index);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full ${
                      index === currentStep
                        ? highContrast
                          ? 'bg-yellow-400 text-black border-4 border-white'
                          : categoryColor + ' text-white'
                        : highContrast
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } rounded-xl p-3 transition-all flex items-center gap-2 text-left`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${
                      completedSteps.includes(index)
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                          ? highContrast
                            ? 'bg-black text-yellow-400'
                            : 'bg-white/30 text-white'
                          : highContrast
                            ? 'bg-gray-700 text-gray-400'
                            : 'bg-gray-300 text-gray-600'
                    } flex items-center justify-center font-bold text-sm`}>
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold leading-tight truncate">
                        {step.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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
