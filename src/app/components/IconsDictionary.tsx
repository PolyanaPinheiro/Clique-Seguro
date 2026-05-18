import { useState } from 'react';
import {
  Volume2,
  ZoomIn,
  ZoomOut,
  Contrast,
  HelpCircle,
  ArrowLeft,
  Search,
  Wifi,
  Battery,
  BatteryLow,
  Bluetooth,
  Signal,
  Phone,
  MessageSquare,
  Camera,
  Image,
  Settings,
  Home,
  ArrowRight,
  Download,
  Share2,
  Trash2,
  Edit,
  Bell,
  Volume,
  VolumeX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Video,
  Mic
} from 'lucide-react';

interface IconDefinition {
  name: string;
  icon: React.ReactNode;
  meaning: string;
  usage: string;
}

interface IconsDictionaryProps {
  onBack: () => void;
}

export function IconsDictionary({ onBack }: IconsDictionaryProps) {
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

  const icons: IconDefinition[] = [
    {
      name: 'Wi-Fi',
      icon: <Wifi className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Internet sem fio',
      usage: 'Mostra se você está conectado à internet Wi-Fi'
    },
    {
      name: 'Bateria Cheia',
      icon: <Battery className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Bateria carregada',
      usage: 'Indica que a bateria está com carga completa'
    },
    {
      name: 'Bateria Fraca',
      icon: <BatteryLow className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Bateria acabando',
      usage: 'Avisa que você precisa carregar o celular em breve'
    },
    {
      name: 'Bluetooth',
      icon: <Bluetooth className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Conexão sem fio',
      usage: 'Mostra que o Bluetooth está ligado para conectar dispositivos'
    },
    {
      name: 'Sinal',
      icon: <Signal className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Sinal de rede',
      usage: 'Indica a força do sinal da operadora de celular'
    },
    {
      name: 'Telefone',
      icon: <Phone className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Fazer ligação',
      usage: 'Toque aqui para ligar para alguém'
    },
    {
      name: 'Mensagem',
      icon: <MessageSquare className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Mensagens',
      usage: 'Abra para ler ou enviar mensagens de texto'
    },
    {
      name: 'Câmera',
      icon: <Camera className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Tirar foto',
      usage: 'Toque para abrir a câmera e tirar fotos'
    },
    {
      name: 'Galeria',
      icon: <Image className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Fotos e vídeos',
      usage: 'Veja todas as suas fotos e vídeos salvos'
    },
    {
      name: 'Configurações',
      icon: <Settings className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Ajustes',
      usage: 'Abra para mudar as configurações do celular'
    },
    {
      name: 'Casa',
      icon: <Home className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Tela inicial',
      usage: 'Toque para voltar à tela principal'
    },
    {
      name: 'Seta',
      icon: <ArrowRight className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Avançar',
      usage: 'Ir para a próxima tela ou página'
    },
    {
      name: 'Download',
      icon: <Download className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Baixar',
      usage: 'Baixar algo da internet para o celular'
    },
    {
      name: 'Compartilhar',
      icon: <Share2 className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Enviar para outros',
      usage: 'Compartilhe fotos ou mensagens com outras pessoas'
    },
    {
      name: 'Lixeira',
      icon: <Trash2 className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Apagar',
      usage: 'Delete fotos, mensagens ou arquivos'
    },
    {
      name: 'Editar',
      icon: <Edit className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Modificar',
      usage: 'Altere ou edite algo'
    },
    {
      name: 'Sino',
      icon: <Bell className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Notificações',
      usage: 'Veja seus avisos e notificações'
    },
    {
      name: 'Volume',
      icon: <Volume className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Som ligado',
      usage: 'O som do celular está ativado'
    },
    {
      name: 'Sem Som',
      icon: <VolumeX className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Som desligado',
      usage: 'O celular está no modo silencioso'
    },
    {
      name: 'Cadeado Fechado',
      icon: <Lock className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Bloqueado',
      usage: 'Protegido com senha ou está bloqueado'
    },
    {
      name: 'Cadeado Aberto',
      icon: <Unlock className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Desbloqueado',
      usage: 'Está aberto ou sem proteção'
    },
    {
      name: 'Olho Aberto',
      icon: <Eye className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Mostrar',
      usage: 'Toque para ver a senha ou informação oculta'
    },
    {
      name: 'Olho Fechado',
      icon: <EyeOff className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Esconder',
      usage: 'A senha ou informação está oculta'
    },
    {
      name: 'Localização',
      icon: <MapPin className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Onde você está',
      usage: 'Mostra sua localização ou endereço'
    },
    {
      name: 'Calendário',
      icon: <Calendar className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Data',
      usage: 'Ver o calendário ou marcar compromissos'
    },
    {
      name: 'Relógio',
      icon: <Clock className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Hora',
      usage: 'Ver as horas ou configurar alarmes'
    },
    {
      name: 'E-mail',
      icon: <Mail className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Correio eletrônico',
      usage: 'Envie ou receba e-mails'
    },
    {
      name: 'Vídeo',
      icon: <Video className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Videochamada',
      usage: 'Faça chamadas de vídeo'
    },
    {
      name: 'Microfone',
      icon: <Mic className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Áudio',
      usage: 'Grave áudio ou envie mensagem de voz'
    },
    {
      name: 'Lupa',
      icon: <Search className="w-full h-full" strokeWidth={2.5} />,
      meaning: 'Buscar',
      usage: 'Procure por algo no celular ou na internet'
    }
  ];

  const filteredIcons = icons.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.usage.toLowerCase().includes(searchTerm.toLowerCase())
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
                <span className="hidden sm:inline">Ler Ícone</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${highContrast ? 'text-white' : 'text-gray-800'}`}>
            Dicionário de Ícones
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Search Box */}
        <div className="mb-8">
          <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-2xl p-4 sm:p-6 shadow-xl`}>
            <div className="flex items-center gap-4">
              <Search className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 ${highContrast ? 'text-white' : 'text-gray-400'}`} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Procure um ícone..."
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

        {/* Icons Grid */}
        {filteredIcons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredIcons.map((item, index) => (
              <div
                key={index}
                className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-6 sm:p-8 shadow-xl`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`${
                    highContrast ? 'bg-white' : 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                  } rounded-2xl p-4 sm:p-6 flex-shrink-0`}>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${
                      highContrast ? 'text-black' : 'text-white'
                    }`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                      highContrast ? 'text-yellow-400' : 'text-indigo-600'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-base sm:text-xl mb-2 font-semibold ${
                      highContrast ? 'text-white' : 'text-gray-800'
                    }`}>
                      {item.meaning}
                    </p>
                    <p className={`text-base sm:text-lg leading-relaxed ${
                      highContrast ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.usage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${highContrast ? 'bg-gray-900 border-4 border-white' : 'bg-white'} rounded-3xl p-8 sm:p-12 text-center shadow-xl`}>
            <p className={`text-xl sm:text-2xl ${highContrast ? 'text-white' : 'text-gray-600'}`}>
              Nenhum ícone encontrado. Tente outra busca.
            </p>
          </div>
        )}
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
