import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";
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

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

// Chatbot knowledge base
const faqs = [
  {
    keywords: ["rdv", "rendez-vous", "réserver", "prendre", "consultation"],
    answer: "Pour prendre rendez-vous, cliquez sur le bouton \"Prendre rendez-vous\" en haut de la page ou rendez-vous dans la section Rendez-vous. Vous pourrez choisir un médecin, une date et une heure qui vous conviennent."
  },
  {
    keywords: ["prix", "coût", "tarif", "payer", "remboursement", "remboursé"],
    answer: "Nos consultations sont au tarif conventionné et sont remboursées par l'Assurance Maladie. Le prix d'une consultation généraliste est de 25€, dont 70% sont remboursés par la sécurité sociale."
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
  }
];

// Function to find a response based on user input
function generateResponse(input: string): string {
  const normalizedInput = input.toLowerCase();
  
  // Check for greetings
  if (/bonjour|salut|hello|hey|coucou/i.test(normalizedInput)) {
    return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
  }
  
  // Check for thanks
  if (/merci|thanks|thank you/i.test(normalizedInput)) {
    return "De rien ! N'hésitez pas si vous avez d'autres questions.";
  }
  
  // Check for appointment redirect request
  if (/prendre.*rendez-vous|réserver|consultation/i.test(normalizedInput)) {
    return "Je peux vous aider à prendre rendez-vous ! Souhaitez-vous être redirigé vers notre page de prise de rendez-vous ?";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

    // Process user message and decide if we should redirect
    const shouldRedirect = /prendre.*rendez-vous|réserver|consultation/i.test(inputValue.toLowerCase()) &&
                          messages.some(m => m.content.includes("Souhaitez-vous être redirigé"));
    
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
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/appointments?new=true");
          setIsOpen(false);
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
      }, 600);
    }
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
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
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
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
              size="icon"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader className="border-b">
              <DrawerTitle>Assistant Virtuel</DrawerTitle>
              <DrawerClose className="absolute right-4 top-4">
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
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-md p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle>Assistant Virtuel</SheetTitle>
          </SheetHeader>
          {chatContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
