
import { X, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatHeaderProps = {
  onClose: () => void;
  title?: string;
};

export function ChatHeader({ onClose, title = "Assistant Virtuel" }: ChatHeaderProps) {
  return (
    <div className="border-b p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h2 className="font-semibold">{title}</h2>
          <Sparkles className="h-3 w-3 ml-1 text-yellow-300" />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-7 w-7 text-white hover:bg-blue-600 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
