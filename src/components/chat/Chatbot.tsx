
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ChatbotMessage } from "./ChatbotMessage";
import { ChatControls } from "./ChatControls";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatHeader } from "./ChatHeader";
import { useSpeechSynthesis } from "@/utils/speechSynthesis";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import "./chatbot.css";
import { generateResponse } from "@/utils/chatbot-utils";

// Import du nouveau fichier d'utilitaires pour le chatbot
import { 
  type Message,
  faqs,
  suggestions as chatSuggestions,
} from "@/utils/chatbot-utils";

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
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { speak, cancel } = useSpeechSynthesis();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Arrêter la synthèse vocale quand le composant est démonté
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  const handleSpeakMessage = (text: string, messageId: string) => {
    if (currentlySpeakingId === messageId) {
      cancel();
      setCurrentlySpeakingId(null);
      return;
    }
    
    // Annuler toute synthèse vocale précédente
    cancel();
    
    if (isSpeechEnabled) {
      speak(text);
      setCurrentlySpeakingId(messageId);
      
      // Réinitialiser l'ID du message parlé une fois terminé
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setCurrentlySpeakingId(null);
      };
    }
  };

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (isSpeechEnabled) {
      cancel();
      setCurrentlySpeakingId(null);
    }
  };

  const clearChat = () => {
    // Garder uniquement le message d'accueil
    setMessages([
      {
        id: Date.now().toString(),
        content: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    cancel();
    setCurrentlySpeakingId(null);
  };

  const downloadChat = () => {
    // Créer le contenu du fichier
    const content = messages.map(msg => {
      const sender = msg.isBot ? "Assistant" : "Vous";
      const time = msg.timestamp.toLocaleString();
      return `[${time}] ${sender}: ${msg.content}`;
    }).join('\n\n');
    
    // Créer et télécharger le fichier
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Téléchargement",
      description: "Votre conversation a été téléchargée"
    });
  };

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
        
        // Si la synthèse vocale est activée, lire la réponse automatiquement
        if (isSpeechEnabled) {
          setTimeout(() => {
            handleSpeakMessage(botResponse.content, botResponse.id);
          }, 300);
        }
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

  // Contenu du chatbot
  const chatContent = (
    <div className="flex flex-col h-full chatbot-container">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatbotMessage
            key={message.id}
            content={message.content}
            isBot={message.isBot}
            timestamp={message.timestamp}
            onSpeakMessage={message.isBot ? (text) => handleSpeakMessage(text, message.id) : undefined}
            isSpeaking={currentlySpeakingId === message.id}
          />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="text-gray-500 ml-2">L'assistant réfléchit...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 1 && (
        <ChatSuggestions 
          suggestions={chatSuggestions.slice(0, 3)} 
          onSuggestionClick={handleSuggestionClick} 
        />
      )}
      
      <ChatControls
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        clearChat={clearChat}
        downloadChat={downloadChat}
        isSpeechEnabled={isSpeechEnabled}
        toggleSpeech={toggleSpeech}
      />
    </div>
  );

  // Composants spécifiques pour mobile et desktop
  if (isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-transform hover:scale-105"
              size="icon"
            >
              <Bot className="h-6 w-6" />
              <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <ChatHeader onClose={() => setIsOpen(false)} />
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
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-transform hover:scale-105"
            size="icon"
          >
            <Bot className="h-6 w-6" />
            <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-md p-0">
          <ChatHeader onClose={() => setIsOpen(false)} />
          {chatContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
