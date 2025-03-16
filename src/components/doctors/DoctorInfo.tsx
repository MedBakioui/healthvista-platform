
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock } from "lucide-react";
import { Doctor } from "@/services/api";

interface DoctorInfoProps {
  doctor: Doctor;
}

export function DoctorInfo({ doctor }: DoctorInfoProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-24 w-24 border-2 border-blue-100">
            <img src={doctor.image} alt={doctor.name} />
          </Avatar>
          
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center text-yellow-500 mr-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="ml-1 font-medium">{doctor.rating}</span>
              </div>
              <span className="text-gray-500">({doctor.reviewCount} avis)</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{doctor.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{doctor.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
