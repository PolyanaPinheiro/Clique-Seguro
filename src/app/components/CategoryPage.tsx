import { useState } from 'react';
import {
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  ArrowLeft,
  Camera,
  Search,
  Sun,
  Bluetooth,
  Settings,
  Bell,
  Smartphone,
  Grid3x3,
  Image,
  Phone,
  MessageSquare,
  Video,
  Mail,
  Users,
  ShieldAlert,
  Lock,
  AlertTriangle,
  KeyRound,
  CreditCard,
  Wallet,
  Building,
  DollarSign
} from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface CategoryPageProps {
  categoryName: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  tutorials: Tutorial[];
  onSelectTutorial: (tutorialId: string) => void;
  onBack: () => void;
}

export function CategoryPage({
  categoryName,
  categoryColor,
  categoryIcon,
  tutorials,
  onSelectTutorial,
  onBack
}: CategoryPageProps) {
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
        {/* Category Header */}
        <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : categoryColor} rounded-3xl p-8 sm:p-12 text-white text-center mb-12 shadow-2xl`}>
          <div className="flex justify-center mb-6">
            <div className={`${highContrast ? 'bg-white' : 'bg-white/20'} rounded-full p-6 sm:p-8`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                {categoryIcon}
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {categoryName}
          </h1>
          <p className="text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
            Escolha um tutorial abaixo para começar a aprender
          </p>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {tutorials.map((tutorial) => (
            <button
              key={tutorial.id}
              onClick={() => onSelectTutorial(tutorial.id)}
              className={`${
                highContrast 
                  ? 'bg-gray-900 border-4 border-white hover:bg-gray-800' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-3xl p-6 sm:p-8 shadow-xl transition-all hover:scale-105 group text-left`}
            >
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div className={`${
                  highContrast 
                    ? 'bg-white' 
                    : categoryColor
                } rounded-2xl p-4 sm:p-6 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center ${
                    highContrast ? 'text-black' : 'text-white'
                  }`}>
                    {tutorial.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 leading-tight ${
                    highContrast ? 'text-white' : 'text-gray-800'
                  }`}>
                    {tutorial.title}
                  </h3>
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    highContrast ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {tutorial.description}
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

// Dados de exemplo para cada categoria
export const categoryTutorialsData = {
  'ferramentas-celular': [
    {
      id: 'tirar-foto',
      title: 'Como tirar Foto',
      description: 'Aprenda a usar a câmera do seu celular',
      icon: <Camera className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'pesquisar-apps',
      title: 'Como pesquisar Aplicativos',
      description: 'Encontre e instale novos aplicativos',
      icon: <Search className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'iluminacao-tela',
      title: 'Como mudar a iluminação da tela?',
      description: 'Ajuste o brilho para ver melhor',
      icon: <Sun className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'bluetooth',
      title: 'Como conectar com o Bluetooth',
      description: 'Conecte fones e outros dispositivos',
      icon: <Bluetooth className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'painel-config',
      title: 'Como usar o Painel de Configurações',
      description: 'Ajuste as configurações do celular',
      icon: <Settings className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'despertar',
      title: 'Como colocar o celular para despertar?',
      description: 'Configure alarmes e despertador',
      icon: <Bell className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'botoes-barra',
      title: 'Como usar os três botões da barra inferior',
      description: 'Navegação básica do celular',
      icon: <Smartphone className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'organizar-icones',
      title: 'Como organizar ícones',
      description: 'Organize sua tela inicial',
      icon: <Grid3x3 className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'ver-fotos',
      title: 'Como ver fotos?',
      description: 'Acesse e visualize suas fotos',
      icon: <Image className="w-full h-full" strokeWidth={2.5} />
    }
  ],
  'comunicacao': [
    {
      id: 'fazer-ligacao',
      title: 'Como fazer uma ligação',
      description: 'Ligue para seus contatos',
      icon: <Phone className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'enviar-mensagem',
      title: 'Como enviar uma mensagem',
      description: 'Envie SMS e mensagens de texto',
      icon: <MessageSquare className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'usar-whatsapp',
      title: 'Como usar o WhatsApp',
      description: 'Converse com amigos e família',
      icon: <MessageSquare className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'videochamada',
      title: 'Como fazer videochamada',
      description: 'Veja seus entes queridos na tela',
      icon: <Video className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'email',
      title: 'Como enviar e-mail',
      description: 'Use o correio eletrônico',
      icon: <Mail className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'adicionar-contato',
      title: 'Como adicionar contatos',
      description: 'Salve números importantes',
      icon: <Users className="w-full h-full" strokeWidth={2.5} />
    }
  ],
  'golpes-seguranca': [
    {
      id: 'identificar-golpes',
      title: 'Como identificar golpes',
      description: 'Reconheça tentativas de fraude',
      icon: <ShieldAlert className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'senhas-seguras',
      title: 'Como criar senhas seguras',
      description: 'Proteja suas contas',
      icon: <Lock className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'links-suspeitos',
      title: 'Cuidado com links suspeitos',
      description: 'Não clique em qualquer link',
      icon: <AlertTriangle className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'autenticacao',
      title: 'Autenticação em duas etapas',
      description: 'Deixe suas contas mais seguras',
      icon: <KeyRound className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'golpe-whatsapp',
      title: 'Golpes no WhatsApp',
      description: 'Proteja-se de mensagens falsas',
      icon: <MessageSquare className="w-full h-full" strokeWidth={2.5} />
    }
  ],
  'contas-bancos': [
    {
      id: 'usar-pix',
      title: 'Como usar o Pix',
      description: 'Transfira dinheiro rapidamente',
      icon: <DollarSign className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'app-banco',
      title: 'Como usar o aplicativo do banco',
      description: 'Acesse sua conta pelo celular',
      icon: <Building className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'pagar-boleto',
      title: 'Como pagar boletos',
      description: 'Pague contas pelo celular',
      icon: <CreditCard className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'verificar-saldo',
      title: 'Como verificar saldo',
      description: 'Consulte seu dinheiro disponível',
      icon: <Wallet className="w-full h-full" strokeWidth={2.5} />
    },
    {
      id: 'compras-online',
      title: 'Como fazer compras online',
      description: 'Compre com segurança pela internet',
      icon: <CreditCard className="w-full h-full" strokeWidth={2.5} />
    }
  ]
};
