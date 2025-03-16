
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Star, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Doctor } from "@/services/api";

interface DoctorCardProps {
  doctor: Doctor;
  showActions?: boolean;
}

export function DoctorCard({ doctor, showActions = true }: DoctorCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <CardContent className="pt-6 flex-grow">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-24 w-24 mb-4 border-2 border-blue-100">
            <img src={doctor.image} alt={doctor.name} />
          </Avatar>
          <h3 className="font-bold text-xl text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600">{doctor.specialty}</p>
          
          <div className="flex items-center justify-center mt-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 font-medium text-gray-900">{doctor.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({doctor.reviewCount} avis)</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <span>{doctor.address}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 shrink-0" />
            <span>Prochain RDV disponible: aujourd'hui</span>
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex gap-2 pt-0">
          <Link to={`/doctors/${doctor.id}`} className="w-full">
            <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
              Profil
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link to={`/doctors/${doctor.id}`} className="w-full">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Rendez-vous
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
