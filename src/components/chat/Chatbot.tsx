
import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatbotMessage } from "./ChatbotMessage";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

// Amélioration de la base de connaissances du chatbot
const faqs = [
  {
    keywords: ["rdv", "rendez-vous", "réserver", "prendre", "consultation"],
    answer: "Pour prendre rendez-vous, cliquez sur le bouton \"Prendre rendez-vous\" en haut de la page ou rendez-vous dans la section Rendez-vous. Vous pourrez choisir un médecin, une date et une heure qui vous conviennent."
  },
  {
    keywords: ["prix", "coût", "tarif", "payer", "remboursement", "remboursé"],
    answer: "Nos consultations sont au tarif conventionné et sont remboursées par l'Assurance Maladie. Le prix d'une consultation généraliste est de 25€, dont 70% sont remboursés par la sécurité sociale. Pour en savoir plus, consultez notre page Tarifs."
  },
  {
    keywords: ["médecin", "docteur", "spécialiste", "disponible"],
    answer: "Nous avons plusieurs médecins disponibles dans différentes spécialités : médecine générale, pédiatrie, dermatologie, et cardiologie. Vous pouvez consulter leurs profils dans la section Médecins."
  },
  {
    keywords: ["ordonnance", "médicament", "prescription"],
    answer: "Oui, nos médecins peuvent établir des ordonnances électroniques lors de votre consultation. Elles sont valables dans toutes les pharmacies et vous seront envoyées par email après la consultation."
  },
  {
    keywords: ["urgence", "urgent"],
    answer: "Notre service n'est pas adapté aux urgences médicales. En cas d'urgence, veuillez composer le 15 (SAMU) ou le 112 (numéro d'urgence européen)."
  },
  {
    keywords: ["comment", "fonctionne", "marche", "étapes"],
    answer: "Notre service fonctionne en quelques étapes simples : créez votre compte, prenez rendez-vous avec un médecin disponible, consultez en ligne par vidéo ou chat, et recevez votre ordonnance si nécessaire."
  },
  {
    keywords: ["coronavirus", "covid", "covid-19", "pandémie", "virus"],
    answer: "Nous proposons des consultations pour les symptômes du COVID-19. Nos médecins peuvent vous conseiller sur les mesures à prendre, vous orienter vers un test si nécessaire et vous délivrer un certificat d'isolement le cas échéant."
  },
  {
    keywords: ["enfant", "pédiatre", "pédiatrie", "bébé"],
    answer: "Nous avons des pédiatres disponibles pour les consultations concernant vos enfants. Ils peuvent traiter les problèmes courants comme les rhumes, les otites, les éruptions cutanées et donner des conseils sur le développement de l'enfant."
  },
  {
    keywords: ["assurance", "mutuelle", "sécu", "sécurité sociale"],
    answer: "Nos consultations sont prises en charge par l'Assurance Maladie et la plupart des mutuelles. Nous vous fournissons une feuille de soins électronique que vous pouvez transmettre à votre complémentaire santé."
  },
  {
    keywords: ["téléconsultation", "vidéo", "visio", "distance", "en ligne"],
    answer: "Notre plateforme de téléconsultation est sécurisée et facile à utiliser. Vous aurez besoin d'une connexion internet stable, d'une caméra et d'un microphone fonctionnels. Un test technique est disponible avant votre rendez-vous."
  }
];

// Suggestions pour démarrer la conversation
const suggestions = [
  "Comment prendre rendez-vous ?",
  "Quels sont vos tarifs ?",
  "Quelles spécialités proposez-vous ?",
  "Comment fonctionne la téléconsultation ?",
  "Les consultations sont-elles remboursées ?",
  "Puis-je obtenir une ordonnance en ligne ?",
  "Avez-vous des médecins disponibles aujourd'hui ?"
];

// Amélioré avec détection de sentiments et réponses plus intelligentes
function generateResponse(input: string): string {
  const normalizedInput = input.toLowerCase();
  
  // Détection de sentiments
  const isAngry = /frustré|énervé|en colère|agacé|ridicule|nul|mauvais|horrible/i.test(normalizedInput);
  const isHappy = /content|heureux|satisfait|génial|super|excellent|merci beaucoup|parfait/i.test(normalizedInput);
  
  // Répondre au sentiment de l'utilisateur
  if (isAngry) {
    return "Je suis désolé que vous vous sentiez ainsi. Comment puis-je vous aider à résoudre ce problème ? N'hésitez pas à contacter notre service client au 01 23 45 67 89 pour une assistance personnalisée.";
  }
  
  if (isHappy) {
    return "Je suis ravi que vous soyez satisfait ! Y a-t-il autre chose que je puisse faire pour vous aujourd'hui ?";
  }
  
  // Check for greetings
  if (/bonjour|salut|hello|hey|coucou/i.test(normalizedInput)) {
    return "Bonjour ! Je suis l'assistant virtuel de la plateforme de téléconsultation. Comment puis-je vous aider aujourd'hui ?";
  }
  
  // Check for thanks
  if (/merci|thanks|thank you/i.test(normalizedInput)) {
    return "De rien ! C'est toujours un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions.";
  }
  
  // Check for appointment redirect request
  if (/prendre.*rendez-vous|réserver|consultation/i.test(normalizedInput)) {
    return "Je peux vous aider à prendre rendez-vous ! Souhaitez-vous être redirigé vers notre page de prise de rendez-vous ?";
  }
  
  // Check for doctor information
  if (/qui sont les médecins|liste.*médecins|voir.*médecins/i.test(normalizedInput)) {
    return "Vous pouvez consulter la liste de tous nos médecins dans la section 'Médecins'. Souhaitez-vous y être redirigé ?";
  }
  
  // Check for pricing information
  if (/prix|coût|tarif|combien.*coûte/i.test(normalizedInput)) {
    return "Nos consultations sont au tarif conventionné Secteur 1. Une consultation de médecine générale coûte 25€, remboursée à 70% par l'Assurance Maladie. Souhaitez-vous consulter notre page de tarifs pour plus de détails ?";
  }
  
  // Check FAQs
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => normalizedInput.includes(keyword))) {
      return faq.answer;
    }
  }
  
  // Default response
  return "Je ne suis pas sûr de comprendre votre question. Pouvez-vous la reformuler ? Vous pouvez me demander des informations sur la prise de rendez-vous, les tarifs, nos médecins disponibles ou comment fonctionne notre service.";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Process user message and decide if we should redirect
    const shouldRedirect = /prendre.*rendez-vous|réserver|consultation/i.test(inputValue.toLowerCase()) &&
                          messages.some(m => m.content.includes("Souhaitez-vous être redirigé"));
    
    const shouldShowDoctors = /qui sont les médecins|liste.*médecins|voir.*médecins/i.test(inputValue.toLowerCase()) &&
                              messages.some(m => m.content.includes("Souhaitez-vous y être redirigé"));
    
    const shouldShowPricing = /prix|coût|tarif|combien.*coûte/i.test(inputValue.toLowerCase()) &&
                             messages.some(m => m.content.includes("Souhaitez-vous consulter notre page de tarifs"));
    
    if (shouldRedirect && /oui|yes|ok|d'accord|bien sûr/i.test(inputValue.toLowerCase())) {
      // Add bot response before redirecting
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now().toString(),
          content: "Parfait ! Je vous redirige vers la page de prise de rendez-vous...",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/appointments?new=true");
          setIsOpen(false);
          toast({
            title: "Redirection",
            description: "Vous avez été redirigé vers la page de prise de rendez-vous",
          });
        }, 1500);
      }, 600);
    } else if (shouldShowDoctors && /oui|yes|ok|d'accord|bien sûr/i.test(inputValue.toLowerCase())) {
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now().toString(),
          content: "Je vous redirige vers la liste de nos médecins...",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        
        setTimeout(() => {
          navigate("/doctors");
          setIsOpen(false);
          toast({
            title: "Redirection",
            description: "Vous avez été redirigé vers la liste de nos médecins",
          });
        }, 1500);
      }, 600);
    } else if (shouldShowPricing && /oui|yes|ok|d'accord|bien sûr/i.test(inputValue.toLowerCase())) {
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now().toString(),
          content: "Je vous redirige vers notre page de tarifs...",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        
        setTimeout(() => {
          navigate("/pricing");
          setIsOpen(false);
          toast({
            title: "Redirection",
            description: "Vous avez été redirigé vers notre page de tarifs",
          });
        }, 1500);
      }, 600);
    } else {
      // Normal bot response after a short delay
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now().toString(),
          content: generateResponse(inputValue),
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1200); // Délai un peu plus long pour simuler la réflexion
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Content for both mobile and desktop
  const chatContent = (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatbotMessage
              key={message.id}
              content={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span>L'assistant est en train d'écrire...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="p-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  className="text-xs text-left text-gray-600 whitespace-normal h-auto py-1.5"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  // Use different components based on device type
  if (isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
              size="icon"
            >
              <Bot className="h-6 w-6" />
              <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader className="border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <DrawerTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Assistant Virtuel
              </DrawerTitle>
              <DrawerClose className="absolute right-4 top-4 text-white hover:bg-blue-600 rounded-full p-1">
                <X className="h-4 w-4" />
              </DrawerClose>
            </DrawerHeader>
            {chatContent}
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
            size="icon"
          >
            <Bot className="h-6 w-6" />
            <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-md p-0">
          <SheetHeader className="border-b p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <SheetTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Assistant Virtuel
            </SheetTitle>
          </SheetHeader>
          {chatContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
