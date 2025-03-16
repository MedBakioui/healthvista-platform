
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Doctor, bookAppointment } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AppointmentBookingProps {
  doctor: Doctor;
}

export function AppointmentBooking({ doctor }: AppointmentBookingProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const timeSlots = [
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleBookAppointment = async () => {
    if (!date || !selectedTimeSlot) return;
    
    setIsSubmitting(true);
    try {
      await bookAppointment(doctor.id, date, selectedTimeSlot, "video", "Consultation générale");
      navigate('/appointments');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la prise de rendez-vous.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Prendre rendez-vous</CardTitle>
        <CardDescription>Consultation: {doctor.price}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="mb-2 font-medium text-gray-700">Sélectionnez une date</p>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md pointer-events-auto"
            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
          />
        </div>
        
        {date && (
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Horaires disponibles {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : ''}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTimeSlot === time ? "default" : "outline"}
                  className={selectedTimeSlot === time ? "bg-blue-500 hover:bg-blue-600" : ""}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={!selectedTimeSlot || isSubmitting}
          onClick={handleBookAppointment}
        >
          {isSubmitting ? "En cours..." : "Confirmer le rendez-vous"}
        </Button>
      </CardFooter>
    </Card>
  );
}
