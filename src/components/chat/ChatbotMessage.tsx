
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, Volume2, VolumeX, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

type ChatbotMessageProps = {
  content: string;
  isBot: boolean;
  timestamp: Date;
  onSpeakMessage?: (text: string) => void;
  isSpeaking?: boolean;
};

export function ChatbotMessage({ 
  content, 
  isBot, 
  timestamp, 
  onSpeakMessage,
  isSpeaking = false
}: ChatbotMessageProps) {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copié",
        description: "Le message a été copié dans le presse-papier",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le texte",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className={cn(
        "flex w-full mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-animate="true"
      style={{
        animation: "fadeIn 0.3s ease-in-out forwards"
      }}
    >
      <div className={cn(
        "flex gap-3 max-w-[80%]",
        isBot ? "flex-row" : "flex-row-reverse"
      )}>
        {isBot ? (
          <Avatar className="h-8 w-8 bg-blue-100">
            <AvatarImage src="/robot.png" alt="Chatbot" />
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.png" alt="User" />
            <AvatarFallback className="bg-gray-200">U</AvatarFallback>
          </Avatar>
        )}
        <div className="relative">
          <div className={cn(
            "rounded-xl px-4 py-2 text-sm",
            isBot ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100" : "bg-blue-500 text-white"
          )}>
            {isBot ? (
              <ReactMarkdown className="prose prose-sm max-w-none">
                {content}
              </ReactMarkdown>
            ) : (
              content
            )}
            {isBot && isHovering && (
              <div className="absolute -top-3 right-0 flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 bg-white" 
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                {onSpeakMessage && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn("h-6 w-6 bg-white", isSpeaking && "bg-blue-100")} 
                    onClick={() => onSpeakMessage(content)}
                  >
                    {isSpeaking ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
