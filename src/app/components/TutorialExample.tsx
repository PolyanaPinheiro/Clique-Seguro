import { Camera, Hand, Square, Eye, Smile, Image, PhoneOff, PhoneCall } from 'lucide-react';
import { TutorialPageWithImage } from './TutorialPageWithImage';
/* import exampleImage from 'figma:asset/bd5374e9531d13ce5ced8dfa978e90b7bcfc2880.png'; */

interface TutorialExampleProps {
  onBack: () => void;
  onComplete?: (tutorialId: string, tutorialTitle: string) => void;
  isLoggedIn?: boolean;
  tutorialId?: string;
}

export function TutorialExample({ onBack, onComplete, isLoggedIn, tutorialId }: TutorialExampleProps) {
  // Exemplo: Tutorial "Como Identificar e Recusar Ligação Suspeita"
  const tutorialSteps = [
    {
      id: 1,
      title: 'Identifique o número desconhecido',
      description: 'Quando seu celular tocar, olhe para a tela. Se aparecer um número que você não conhece ou a mensagem "Spam suspeito", tenha cuidado.',
      tips: 'Nunca atenda ligações de números desconhecidos que seu celular já marcou como spam.',
      icon: <PhoneCall className="w-full h-full text-orange-600" strokeWidth={2} />,
      /* interactiveImage: exampleImage, */ 
      imageHotspots: [
        {
          x: 50,
          y: 15,
          label: 'Chamada recebida - veja quem está ligando',
          pulse: true
        },
        {
          x: 50,
          y: 25,
          label: 'Aviso de "Spam suspeito"',
          pulse: true
        }
      ]
    },
    {
      id: 2,
      title: 'Veja o aviso de spam',
      description: 'Seu celular é inteligente e avisa quando uma ligação pode ser perigosa. Se aparecer "Spam suspeito" ou "Possível golpe", NÃO atenda.',
      tips: 'Empresas e bancos sérios nunca ligam pedindo senhas ou dados pessoais por telefone.',
      icon: <Eye className="w-full h-full text-red-600" strokeWidth={2} />,
      /* interactiveImage: exampleImage, */
      imageHotspots: [
        {
          x: 50,
          y: 25,
          label: 'Este aviso indica perigo!',
          pulse: true
        }
      ]
    },
    {
      id: 3,
      title: 'Toque no botão vermelho para recusar',
      description: 'Para não atender a ligação, toque no botão vermelho com o símbolo de telefone virado para baixo. Este botão geralmente fica no canto inferior esquerdo da tela.',
      tips: 'Quando você recusa a ligação, a pessoa não pode falar com você e não tem acesso ao seu celular.',
      icon: <PhoneOff className="w-full h-full text-red-600" strokeWidth={2} />,
      /* interactiveImage: exampleImage, */
      imageHotspots: [
        {
          x: 25,
          y: 85,
          label: 'Toque aqui para recusar a ligação',
          pulse: true
        }
      ]
    },
    {
      id: 4,
      title: 'Bloqueie o número se quiser',
      description: 'Depois de recusar, você pode bloquear esse número para que ele não ligue mais. Vá até a lista de chamadas recentes, toque no número e escolha "Bloquear".',
      tips: 'Bloqueando números suspeitos, você fica mais protegido contra golpes.',
      icon: <Square className="w-full h-full text-purple-600" strokeWidth={2} />,
    },
    {
      id: 5,
      title: 'Nunca forneça dados pessoais',
      description: 'Lembre-se: bancos, lojas e empresas NUNCA pedem senha, número de cartão ou código por telefone. Se alguém pedir isso, é golpe!',
      tips: 'Se tiver dúvida sobre uma ligação, desligue e ligue você mesmo para o número oficial da empresa.',
      icon: <Smile className="w-full h-full text-green-600" strokeWidth={2} />,
    }
  ];

  const TUTORIAL_ID = tutorialId || 'identificar-ligacao-suspeita';
  const TUTORIAL_TITLE = 'Como Identificar e Recusar Ligação Suspeita';

  return (
    <TutorialPageWithImage
      categoryName="Golpes e Segurança"
      categoryColor="bg-gradient-to-br from-orange-500 to-orange-600"
      tutorialTitle={TUTORIAL_TITLE}
      steps={tutorialSteps}
      onBack={onBack}
    />
  );
}