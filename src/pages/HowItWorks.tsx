
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, UserPlus, Calendar, Video, FileText, Shield, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HowItWorksComponent from "@/components/home/HowItWorks";

export default function HowItWorks() {
  const benefits = [
    {
      icon: Shield,
      title: "Sécurité et confidentialité",
      description: "Vos données médicales sont protégées et cryptées, respectant les normes les plus strictes de confidentialité.",
    },
    {
      icon: CheckCircle2,
      title: "Médecins certifiés",
      description: "Tous nos médecins sont vérifiés et possèdent les qualifications nécessaires pour exercer la télémédecine.",
    },
    {
      icon: Calendar,
      title: "Disponibilité étendue",
      description: "Consultez même en dehors des heures de bureau traditionnelles, y compris le soir et le week-end.",
    },
  ];

  const faqItems = [
    {
      question: "Comment se déroule une consultation en ligne ?",
      answer: "La consultation se fait par vidéo via notre plateforme sécurisée. Le médecin vous posera des questions, vous examinera visuellement et vous donnera un diagnostic, des conseils et une ordonnance si nécessaire.",
    },
    {
      question: "Les consultations sont-elles remboursées ?",
      answer: "Oui, nos consultations sont remboursées par l'Assurance Maladie dans les mêmes conditions qu'une consultation physique, soit à hauteur de 70% du tarif conventionné.",
    },
    {
      question: "Puis-je obtenir une ordonnance lors d'une téléconsultation ?",
      answer: "Oui, le médecin peut vous délivrer une ordonnance électronique qui sera directement envoyée à la pharmacie de votre choix ou téléchargeable depuis votre espace patient.",
    },
    {
      question: "Quels types de problèmes médicaux peuvent être traités en téléconsultation ?",
      answer: "La téléconsultation est adaptée pour de nombreux problèmes : symptômes de rhume ou grippe, problèmes digestifs, infections urinaires, renouvellement d'ordonnance, etc. En cas d'urgence vitale ou de symptômes graves, contactez le 15 ou rendez-vous aux urgences.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              La santé à portée de clic
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Accédez à des consultations médicales de qualité depuis chez vous, sans attente et en toute sécurité.
            </p>
            <Link to="/register">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl">
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <HowItWorksComponent />

        <section className="py-16 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-heading">Les avantages de la téléconsultation</h2>
              <p className="section-subheading max-w-3xl mx-auto">
                Notre service offre de nombreux bénéfices par rapport à une consultation traditionnelle en cabinet médical.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5 text-blue-600">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-heading">Questions fréquentes</h2>
              <p className="section-subheading max-w-3xl mx-auto">
                Vous avez des questions sur notre service ? Consultez nos réponses aux questions les plus fréquemment posées.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Vous ne trouvez pas de réponse à votre question ?</p>
              <Link to="/contact">
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
