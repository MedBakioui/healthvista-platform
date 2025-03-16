
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Doctor } from "@/services/api";

interface DoctorTabsProps {
  doctor: Doctor;
}

export function DoctorTabs({ doctor }: DoctorTabsProps) {
  return (
    <Tabs defaultValue="about">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="about">À propos</TabsTrigger>
        <TabsTrigger value="experience">Expérience</TabsTrigger>
        <TabsTrigger value="reviews">Avis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Présentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{doctor.bio}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spécialités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {doctor.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Langues parlées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((language, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  {language}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="experience">
        <Card>
          <CardHeader>
            <CardTitle>Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4 py-1">
                  <p className="font-semibold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reviews">
        <Card>
          <CardHeader>
            <CardTitle>Avis des patients</CardTitle>
            <CardDescription>Fonctionnalité à venir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p className="text-gray-500">Les avis des patients seront bientôt disponibles.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
