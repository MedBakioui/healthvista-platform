
export function useSpeechSynthesis() {
  const speak = (text: string, voiceLanguage = 'fr-FR') => {
    if (!('speechSynthesis' in window)) {
      console.error('La synthèse vocale n\'est pas prise en charge par ce navigateur.');
      return null;
    }

    // Arrêter toute voix en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Trouver une voix française
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.lang.includes(voiceLanguage));
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = voiceLanguage;
    utterance.rate = 1;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
    
    return {
      utterance,
      cancel: () => window.speechSynthesis.cancel()
    };
  };

  const getVoices = () => {
    if (!('speechSynthesis' in window)) {
      return [];
    }
    return window.speechSynthesis.getVoices();
  };
  
  return {
    speak,
    getVoices,
    cancel: () => window.speechSynthesis.cancel()
  };
}
