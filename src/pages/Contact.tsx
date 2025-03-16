
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les meilleurs délais.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+33 1 23 45 67 89"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@telesante.fr", "support@telesante.fr"],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Avenue de la Santé", "75001 Paris, France"],
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Ven: 9h-19h", "Sam: 10h-17h"],
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const faqs = [
    {
      question: "Comment puis-je modifier ou annuler mon rendez-vous ?",
      answer: "Vous pouvez gérer vos rendez-vous depuis votre espace personnel. La modification ou l'annulation est possible jusqu'à 2 heures avant l'heure prévue.",
    },
    {
      question: "Comment contacter le support technique ?",
      answer: "Pour toute question technique, vous pouvez nous contacter par email à support@telesante.fr ou par téléphone au +33 1 23 45 67 89.",
    },
    {
      question: "Je n'arrive pas à me connecter à mon compte, que faire ?",
      answer: "Vous pouvez utiliser la fonction 'Mot de passe oublié' sur la page de connexion ou contacter notre support technique qui vous assistera dans la récupération de votre compte.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <div className="space-y-1">
                      {item.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-blue-500" />
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Votre email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="Objet de votre message"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Votre message"
                      rows={5}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Besoin d'aide urgente ?</h3>
                  <p className="text-gray-600 mb-4">
                    Pour toute question médicale urgente, veuillez contacter directement notre service d'assistance téléphonique.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <Phone className="h-5 w-5 mr-2" />
                    +33 1 23 45 67 89
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre emplacement</h2>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                Nos bureaux sont situés en plein cœur de Paris, facilement accessibles en transports en commun.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21015.34793156697!2d2.3220339!3d48.8588443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1630675863215!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
