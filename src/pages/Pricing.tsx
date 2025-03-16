
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Pricing() {
  const plans = [
    {
      name: "Consultation ponctuelle",
      price: "25€",
      description: "Pour une consultation simple sans engagement",
      features: [
        "Consultation avec un médecin généraliste",
        "Suivi pendant 7 jours",
        "Ordonnance électronique si besoin",
        "Remboursement par l'Assurance Maladie",
      ],
      popular: false,
      buttonText: "Choisir ce plan",
      buttonVariant: "outline" as const,
    },
    {
      name: "Abonnement mensuel",
      price: "19,90€/mois",
      description: "Pour un suivi médical régulier",
      features: [
        "Consultations illimitées avec médecins généralistes",
        "Priorité sur les rendez-vous",
        "Ordonnances électroniques",
        "Support médical 7j/7",
        "Historique médical complet",
      ],
      popular: true,
      buttonText: "Commencer l'essai gratuit",
      buttonVariant: "default" as const,
    },
    {
      name: "Abonnement familial",
      price: "39,90€/mois",
      description: "Pour toute la famille (jusqu'à 5 personnes)",
      features: [
        "Consultations illimitées pour tous les membres",
        "Dossier médical pour chaque membre",
        "Accès prioritaire aux médecins spécialistes",
        "Suivi pédiatrique inclus",
        "Support médical 7j/7",
      ],
      popular: false,
      buttonText: "Choisir ce plan",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos tarifs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Des formules adaptées à vos besoins, transparentes et sans surprise.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${
                    plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register" className="w-full">
                      <Button 
                        variant={plan.buttonVariant} 
                        className={`w-full ${
                          plan.popular 
                            ? "bg-blue-500 hover:bg-blue-600 text-white" 
                            : "border-blue-500 text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Remboursement des consultations
                </h2>
                <p className="text-gray-600 mb-6">
                  Les consultations de médecine générale sont remboursées par l'Assurance Maladie dans les mêmes conditions qu'une consultation en cabinet, soit à hauteur de 70% du tarif conventionné (25€).
                </p>
                <p className="text-gray-600 mb-6">
                  Votre complémentaire santé peut prendre en charge tout ou partie du reste à charge selon votre contrat.
                </p>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Consultation généraliste (25€)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Remboursement Assurance Maladie</span>
                    <span className="font-medium">17,50€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Reste à charge (sans mutuelle)</span>
                    <span className="font-medium">7,50€</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Questions fréquentes sur les tarifs</h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Comment fonctionnne l'essai gratuit ?</h4>
                    <p className="text-gray-600 text-sm">L'essai gratuit dure 14 jours et vous donne accès à toutes les fonctionnalités de l'abonnement. Vous pouvez l'annuler à tout moment.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Puis-je changer de formule ?</h4>
                    <p className="text-gray-600 text-sm">Oui, vous pouvez changer de formule à tout moment. Les changements prendront effet à la prochaine période de facturation.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Y a-t-il un engagement minimum ?</h4>
                    <p className="text-gray-600 text-sm">Non, nos abonnements sont sans engagement de durée. Vous pouvez résilier à tout moment depuis votre espace personnel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
