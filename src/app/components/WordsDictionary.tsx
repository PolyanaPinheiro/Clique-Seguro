import { useState } from 'react';
import {
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  ArrowLeft,
  Search
} from 'lucide-react';

interface WordDefinition {
  word: string;
  definition: string;
  example?: string;
}

interface WordsDictionaryProps {
  onBack: () => void;
}

export function WordsDictionary({ onBack }: WordsDictionaryProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const words: WordDefinition[] = [
    {
      word: 'App (Aplicativo)',
      definition: 'Um programa que você instala no celular para fazer alguma coisa específica, como o WhatsApp para conversar ou o YouTube para assistir vídeos.',
      example: 'Exemplo: "Vou baixar o app do banco para ver meu saldo."'
    },
    {
      word: 'Bluetooth',
      definition: 'Uma tecnologia que conecta o celular com outros aparelhos sem precisar de fio, como fones de ouvido ou caixas de som.',
      example: 'Exemplo: "Conectei meu fone pelo Bluetooth."'
    },
    {
      word: 'Câmera',
      definition: 'A parte do celular que tira fotos e grava vídeos. Pode ser a da frente (para selfies) ou a de trás.',
      example: 'Exemplo: "Abri a câmera para tirar uma foto."'
    },
    {
      word: 'Wi-Fi',
      definition: 'Internet sem fio. Permite que seu celular se conecte à internet sem usar os dados móveis.',
      example: 'Exemplo: "Estou conectado no Wi-Fi de casa."'
    },
    {
      word: 'Dados Móveis',
      definition: 'A internet que você usa quando não está conectado no Wi-Fi. Consome o pacote de internet do seu plano.',
      example: 'Exemplo: "Desliguei os dados móveis para não gastar meu pacote."'
    },
    {
      word: 'Notificação',
      definition: 'Um aviso que aparece na tela do celular quando você recebe uma mensagem, ligação ou atualização de algum app.',
      example: 'Exemplo: "Recebi uma notificação do WhatsApp."'
    },
    {
      word: 'Baixar / Download',
      definition: 'Buscar e instalar algo da internet para o seu celular, como um aplicativo, foto ou música.',
      example: 'Exemplo: "Vou baixar esse aplicativo na loja."'
    },
    {
      word: 'Senha',
      definition: 'Uma combinação de números, letras ou símbolos que você cria para proteger suas informações e impedir que outras pessoas acessem suas contas.',
      example: 'Exemplo: "Não compartilhe sua senha com ninguém."'
    },
    {
      word: 'Tela Inicial',
      definition: 'A primeira tela que você vê quando desbloqueia o celular, onde ficam os ícones dos aplicativos.',
      example: 'Exemplo: "Coloquei o WhatsApp na tela inicial para achar mais rápido."'
    },
    {
      word: 'Tela de Bloqueio',
      definition: 'A tela que aparece quando o celular está desligado ou travado. Você precisa deslizar ou digitar a senha para desbloqueá-lo.',
      example: 'Exemplo: "Na tela de bloqueio, você pode ver as horas."'
    },
    {
      word: 'Barra de Notificações',
      definition: 'Uma área no topo da tela que mostra avisos importantes, como mensagens, bateria e hora. Você pode puxar de cima para baixo para ver mais detalhes.',
      example: 'Exemplo: "Puxei a barra de notificações para ver a mensagem."'
    },
    {
      word: 'Touch / Tocar',
      definition: 'Quando você encosta o dedo na tela do celular para selecionar algo.',
      example: 'Exemplo: "Toque no ícone do app para abri-lo."'
    },
    {
      word: 'Deslizar',
      definition: 'Quando você arrasta o dedo pela tela, de um lado para o outro ou de cima para baixo.',
      example: 'Exemplo: "Deslize para a esquerda para ver mais fotos."'
    },
    {
      word: 'Zoom',
      definition: 'Aumentar ou diminuir algo na tela. Você pode fazer zoom abrindo ou fechando dois dedos na tela.',
      example: 'Exemplo: "Dei zoom na foto para ver melhor."'
    },
    {
      word: 'Bateria',
      definition: 'A energia que faz o celular funcionar. Quando a bateria acaba, você precisa carregar o celular.',
      example: 'Exemplo: "A bateria está acabando, vou colocar para carregar."'
    },
    {
      word: 'Atualização',
      definition: 'Quando um aplicativo ou o sistema do celular recebe melhorias e correções. É importante manter tudo atualizado.',
      example: 'Exemplo: "Há uma atualização disponível para o WhatsApp."'
    },
    {
      word: 'Link',
      definition: 'Um endereço da internet que, quando você clica, te leva para outro site ou página.',
      example: 'Exemplo: "Cuidado ao clicar em links de desconhecidos."'
    },
    {
      word: 'Backup',
      definition: 'Uma cópia de segurança das suas fotos, contatos e informações do celular, guardada em outro lugar (como na nuvem).',
      example: 'Exemplo: "Fiz backup das minhas fotos para não perder."'
    },
    {
      word: 'Nuvem',
      definition: 'Um lugar na internet onde você pode guardar suas fotos, arquivos e informações de forma segura.',
      example: 'Exemplo: "Minhas fotos estão salvas na nuvem."'
    },
    {
      word: 'QR Code',
      definition: 'Um código em forma de quadrado com desenhos que você aponta a câmera do celular para ler informações ou entrar em sites.',
      example: 'Exemplo: "Usei o QR Code para fazer o Pix."'
    }
  ];

  const filteredWords = words.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <span className="hidden sm:inline">Ler Palavra</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${highContrast ? 'text-white' : 'text-gray-800'}`}>
            Dicionário de Palavras
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Search Box */}
        <div className="mb-8">
          <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-2xl p-4 sm:p-6 shadow-xl`}>
            <div className="flex items-center gap-4">
              <Search className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 ${highContrast ? 'text-white' : 'text-gray-400'}`} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Procure uma palavra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`flex-1 text-xl sm:text-2xl px-4 py-3 rounded-xl ${
                  highContrast 
                    ? 'bg-black text-white border-4 border-white' 
                    : 'bg-gray-100 text-gray-800'
                } focus:outline-none focus:ring-4 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Words List */}
        <div className="space-y-6">
          {filteredWords.length > 0 ? (
            filteredWords.map((item, index) => (
              <div
                key={index}
                className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-8 shadow-xl`}
              >
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
                  highContrast ? 'text-yellow-400' : 'text-indigo-600'
                }`}>
                  {item.word}
                </h2>
                <p className={`text-lg sm:text-2xl leading-relaxed mb-4 ${
                  highContrast ? 'text-white' : 'text-gray-800'
                }`}>
                  {item.definition}
                </p>
                {item.example && (
                  <div className={`${
                    highContrast ? 'bg-black border-2 border-gray-700' : 'bg-indigo-50'
                  } rounded-xl p-4 sm:p-6 mt-4`}>
                    <p className={`text-base sm:text-xl italic leading-relaxed ${
                      highContrast ? 'text-gray-300' : 'text-indigo-800'
                    }`}>
                      {item.example}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-8 sm:p-12 text-center shadow-xl`}>
              <p className={`text-xl sm:text-2xl ${highContrast ? 'text-white' : 'text-gray-600'}`}>
                Nenhuma palavra encontrada. Tente outra busca.
              </p>
            </div>
          )}
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
