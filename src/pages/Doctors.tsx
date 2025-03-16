
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DoctorsList } from "@/components/doctors/DoctorsList";

export default function Doctors() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos médecins
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Consultez notre équipe de médecins qualifiés et prenez rendez-vous en quelques clics. 
              Tous nos médecins sont disponibles pour des téléconsultations.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <DoctorsList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
