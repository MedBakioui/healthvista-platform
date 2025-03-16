
import { Button } from "@/components/ui/button";

type ChatSuggestionsProps = {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};

export function ChatSuggestions({ suggestions, onSuggestionClick }: ChatSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border-t">
      <p className="text-sm text-gray-500 mb-2">Suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm"
            className="text-xs text-left text-gray-600 whitespace-normal h-auto py-1.5 hover:bg-blue-50 hover:border-blue-200 transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
