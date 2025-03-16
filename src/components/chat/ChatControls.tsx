
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Download, RotateCcw, Volume, VolumeX } from "lucide-react";
import { useState } from "react";

type ChatControlsProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearChat: () => void;
  downloadChat: () => void;
  isSpeechEnabled: boolean;
  toggleSpeech: () => void;
};

export function ChatControls({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  clearChat,
  downloadChat,
  isSpeechEnabled,
  toggleSpeech
}: ChatControlsProps) {
  return (
    <div className="border-t p-4">
      <div className="flex gap-2 items-center mb-2">
        <Button 
          onClick={clearChat} 
          size="icon" 
          variant="outline" 
          className="h-8 w-8"
          title="Effacer la conversation"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button 
          onClick={downloadChat} 
          size="icon" 
          variant="outline" 
          className="h-8 w-8"
          title="Télécharger la conversation"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          onClick={toggleSpeech} 
          size="icon" 
          variant="outline" 
          className={`h-8 w-8 ${isSpeechEnabled ? 'bg-blue-100' : ''}`}
          title={isSpeechEnabled ? "Désactiver la synthèse vocale" : "Activer la synthèse vocale"}
        >
          {isSpeechEnabled ? <Volume className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Tapez votre message..."
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon" 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={!inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
