
import { toast } from "@/hooks/use-toast";

// Types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  availability: string;
  price: string;
  bio: string;
  education: { degree: string; institution: string; year: string }[];
  languages: string[];
  specialties: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  status: 'upcoming' | 'completed' | 'cancelled';
}

// Mock API functions 
export const fetchDoctors = async (): Promise<Doctor[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      name: "Dr. Marie Dubois",
      specialty: "Médecin généraliste",
      rating: 4.8,
      reviewCount: 127,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      address: "15 rue de la Santé, 75013 Paris",
      availability: "9h00 - 18h00, Lun-Ven",
      price: "25 €",
      bio: "Le Dr. Marie Dubois est médecin généraliste depuis plus de 15 ans. Diplômée de la faculté de médecine de Paris, elle a exercé en milieu hospitalier avant d'ouvrir son cabinet. Elle est particulièrement attentive à la relation médecin-patient et prend le temps d'écouter et d'expliquer les diagnostics et traitements.",
      education: [
        { degree: "Doctorat en Médecine", institution: "Université Paris Descartes", year: "2005" },
        { degree: "Spécialisation en Médecine Générale", institution: "Hôpital Necker-Enfants Malades", year: "2008" }
      ],
      languages: ["Français", "Anglais", "Espagnol"],
      specialties: ["Médecine préventive", "Suivi des maladies chroniques", "Pédiatrie", "Gériatrie"]
    },
    {
      id: "2",
      name: "Dr. Thomas Moreau",
      specialty: "Pédiatre",
      rating: 4.9,
      reviewCount: 98,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      address: "8 avenue des Enfants, 75015 Paris",
      availability: "8h30 - 17h00, Lun-Ven",
      price: "30 €",
      bio: "Le Dr. Thomas Moreau est pédiatre depuis 12 ans. Spécialisé dans le développement de l'enfant, il assure un suivi personnalisé de ses patients de la naissance à l'adolescence.",
      education: [
        { degree: "Doctorat en Médecine", institution: "Université Paris Diderot", year: "2007" },
        { degree: "Spécialisation en Pédiatrie", institution: "Hôpital Robert Debré", year: "2011" }
      ],
      languages: ["Français", "Anglais"],
      specialties: ["Pédiatrie générale", "Suivi du développement", "Vaccination", "Troubles de l'apprentissage"]
    },
    {
      id: "3",
      name: "Dr. Sophie Lambert",
      specialty: "Dermatologue",
      rating: 4.7,
      reviewCount: 113,
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      address: "22 rue de la Peau, 75008 Paris",
      availability: "10h00 - 18h00, Mar-Sam",
      price: "45 €",
      bio: "Le Dr. Sophie Lambert est dermatologue spécialisée dans le traitement des maladies de peau et la dermatologie esthétique. Elle propose des consultations pour adultes et enfants.",
      education: [
        { degree: "Doctorat en Médecine", institution: "Université Aix-Marseille", year: "2006" },
        { degree: "Spécialisation en Dermatologie", institution: "Hôpital Saint-Louis", year: "2010" }
      ],
      languages: ["Français", "Anglais", "Italien"],
      specialties: ["Dermatologie générale", "Dermatologie pédiatrique", "Allergologie cutanée", "Dermatologie esthétique"]
    }
  ];
};

export const fetchDoctor = async (id: string): Promise<Doctor> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const doctors = await fetchDoctors();
  const doctor = doctors.find(doc => doc.id === id);
  
  if (!doctor) {
    throw new Error("Médecin non trouvé");
  }
  
  return doctor;
};

export const bookAppointment = async (
  doctorId: string, 
  date: Date, 
  time: string, 
  type: 'video' | 'chat',
  reason: string
): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app, this would send data to a backend
  // For now, we'll just show a success toast and return true
  toast({
    title: "Rendez-vous confirmé",
    description: `Votre rendez-vous a été confirmé pour le ${date.toLocaleDateString('fr-FR')} à ${time}.`,
  });
  
  return true;
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));
  
  // Mock appointments data
  return [
    {
      id: "appt1",
      doctorId: "1",
      doctorName: "Dr. Marie Dubois",
      doctorSpecialty: "Médecin généraliste",
      date: "2023-07-15",
      time: "14:30",
      type: "video",
      status: "upcoming"
    },
    {
      id: "appt2",
      doctorId: "3",
      doctorName: "Dr. Sophie Lambert",
      doctorSpecialty: "Dermatologue",
      date: "2023-06-28",
      time: "10:00",
      type: "chat",
      status: "completed"
    }
  ];
};
