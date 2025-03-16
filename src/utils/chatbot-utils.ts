
export type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

// Base de connaissances du chatbot
export const faqs = [
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
export const suggestions = [
  "Comment prendre rendez-vous ?",
  "Quels sont vos tarifs ?",
  "Quelles spécialités proposez-vous ?",
  "Comment fonctionne la téléconsultation ?",
  "Les consultations sont-elles remboursées ?",
  "Puis-je obtenir une ordonnance en ligne ?",
  "Avez-vous des médecins disponibles aujourd'hui ?"
];

// Fonction améliorée avec détection de sentiments et réponses plus intelligentes
export function generateResponse(input: string): string {
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
