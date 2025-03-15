
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ChatbotMessageProps = {
  content: string;
  isBot: boolean;
  timestamp: Date;
};

export function ChatbotMessage({ content, isBot, timestamp }: ChatbotMessageProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex gap-3 max-w-[80%]",
        isBot ? "flex-row" : "flex-row-reverse"
      )}>
        {isBot ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/robot.png" alt="Chatbot" />
            <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.png" alt="User" />
            <AvatarFallback className="bg-gray-200">U</AvatarFallback>
          </Avatar>
        )}
        <div>
          <div className={cn(
            "rounded-xl px-4 py-2 text-sm",
            isBot ? "bg-blue-50 border border-blue-100" : "bg-blue-500 text-white"
          )}>
            {content}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
