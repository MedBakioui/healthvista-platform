
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, FileText, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { fetchDoctors, bookAppointment } from '@/services/api';

type AppointmentFormProps = {
  preselectedDoctorId?: string;
};

export default function AppointmentForm({ preselectedDoctorId }: AppointmentFormProps) {
  const [appointmentType, setAppointmentType] = useState<'video' | 'chat'>('video');
  const [selectedDoctor, setSelectedDoctor] = useState<string>(preselectedDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch doctors
  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  // Set preselected doctor when data is loaded
  useEffect(() => {
    if (preselectedDoctorId && doctors.length > 0) {
      setSelectedDoctor(preselectedDoctorId);
    }
  }, [preselectedDoctorId, doctors]);

  // Time slots (this would typically come from an API based on doctor availability)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Filter available time slots based on selected date and doctor
  // This is a placeholder - in a real app this would come from the backend
  const availableTimeSlots = timeSlots.filter((_, index) => {
    // On weekends, only morning slots are available
    const isWeekend = selectedDate ? selectedDate.getDay() === 0 || selectedDate.getDay() === 6 : false;
    if (isWeekend && index > 5) return false;
    // Random availability simulation - different for each doctor and date
    return Math.random() > 0.3;
  });

  const handleNext = () => {
    if (step === 1) {
      if (!selectedDoctor) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un médecin.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une date et une heure.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!reason) {
        toast({
          title: "Erreur",
          description: "Veuillez indiquer le motif de votre consultation.",
          variant: "destructive",
        });
        return;
      }
      
      // Submit appointment
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) return;
    
    setIsSubmitting(true);
    try {
      await bookAppointment(
        selectedDoctor,
        selectedDate,
        selectedTime,
        appointmentType,
        reason
      );
      navigate('/appointments');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du rendez-vous.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="glass-card p-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Prendre rendez-vous</h2>
          <div className="flex items-center space-x-2 text-sm font-medium">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
            <span className="text-gray-300">—</span>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
            <span className="text-gray-300">—</span>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Label>Type de consultation</Label>
              <RadioGroup 
                value={appointmentType} 
                onValueChange={(value) => setAppointmentType(value as 'video' | 'chat')}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className={`relative flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                  appointmentType === 'video' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <RadioGroupItem value="video" id="video" className="absolute opacity-0" />
                  <Video className={`h-6 w-6 ${appointmentType === 'video' ? 'text-blue-500' : 'text-gray-500'}`} />
                  <div>
                    <Label htmlFor="video" className="font-medium cursor-pointer">
                      Vidéoconsultation
                    </Label>
                    <p className="text-sm text-gray-500">
                      Consultation en face à face par vidéo
                    </p>
                  </div>
                </div>
                
                <div className={`relative flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                  appointmentType === 'chat' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <RadioGroupItem value="chat" id="chat" className="absolute opacity-0" />
                  <FileText className={`h-6 w-6 ${appointmentType === 'chat' ? 'text-blue-500' : 'text-gray-500'}`} />
                  <div>
                    <Label htmlFor="chat" className="font-medium cursor-pointer">
                      Consultation écrite
                    </Label>
                    <p className="text-sm text-gray-500">
                      Échange par messages avec le médecin
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Choisir un médecin</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center">
                        <span>{doctor.name}</span>
                        <span className="ml-2 text-sm text-gray-500">({doctor.specialty})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label>Date de consultation</Label>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, 'PPP', { locale: fr })
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => 
                        date < new Date() || 
                        date > addDays(new Date(), 30)
                      }
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>Heure de consultation</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant="outline"
                      className={`flex items-center justify-center ${
                        selectedTime === time
                          ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                          : 'hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-3 sm:col-span-4 text-center py-4 text-gray-500">
                    Aucun créneau disponible à cette date
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label htmlFor="reason">Motif de consultation</Label>
              <Textarea
                id="reason"
                placeholder="Décrivez brièvement le motif de votre consultation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Ces informations aideront le médecin à se préparer à votre consultation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Récapitulatif</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Type:</dt>
                  <dd className="font-medium text-gray-900">
                    {appointmentType === 'video' ? 'Vidéoconsultation' : 'Consultation écrite'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Médecin:</dt>
                  <dd className="font-medium text-gray-900">
                    {doctors.find(d => d.id === selectedDoctor)?.name || '-'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Date:</dt>
                  <dd className="font-medium text-gray-900">
                    {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : '-'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Heure:</dt>
                  <dd className="font-medium text-gray-900">{selectedTime || '-'}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Retour
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          type="button"
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "En cours..." : (step === 3 ? 'Confirmer le rendez-vous' : 'Continuer')}
        </Button>
      </div>
    </div>
  );
}
