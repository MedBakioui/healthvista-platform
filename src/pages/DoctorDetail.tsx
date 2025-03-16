
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { fetchDoctor } from '@/services/api';
import { DoctorInfo } from '@/components/doctors/DoctorInfo';
import { DoctorTabs } from '@/components/doctors/DoctorTabs';
import { AppointmentBooking } from '@/components/doctors/AppointmentBooking';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: doctor, isLoading, error } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => fetchDoctor(id || ''),
  });

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container-custom py-8 space-y-8">
          <Link to="/doctors" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux médecins
          </Link>

          {isLoading ? (
            <div className="py-16 flex justify-center">Chargement...</div>
          ) : error ? (
            <div className="py-16">Une erreur est survenue</div>
          ) : doctor ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <DoctorInfo doctor={doctor} />
                <DoctorTabs doctor={doctor} />
              </div>
              
              <div>
                <AppointmentBooking doctor={doctor} />
              </div>
            </div>
          ) : (
            <div className="py-16">Médecin non trouvé</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
