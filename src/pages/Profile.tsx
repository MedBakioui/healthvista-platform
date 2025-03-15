
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileEdit, Lock, UserCircle, Bell, CalendarClock, ClipboardList } from 'lucide-react';

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-gray-50">
        <div className="container-custom max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Mon profil</h1>
            <p className="text-lg text-gray-600">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" alt="Photo de profil" />
                    <AvatarFallback className="text-xl">MP</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">Michel Petit</h2>
                  <p className="text-gray-600">michel.petit@example.com</p>
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <UserCircle className="mr-2 h-5 w-5" />
                      Informations
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile/security">
                      <Lock className="mr-2 h-5 w-5" />
                      Sécurité
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile/preferences">
                      <Bell className="mr-2 h-5 w-5" />
                      Préférences
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/appointments">
                      <CalendarClock className="mr-2 h-5 w-5" />
                      Rendez-vous
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile/medical-history">
                      <ClipboardList className="mr-2 h-5 w-5" />
                      Dossier médical
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-8 grid grid-cols-3 h-auto">
                  <TabsTrigger value="personal" className="py-3">Informations personnelles</TabsTrigger>
                  <TabsTrigger value="medical" className="py-3">Informations médicales</TabsTrigger>
                  <TabsTrigger value="insurance" className="py-3">Assurance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-semibold">Informations personnelles</CardTitle>
                      <FileEdit className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" defaultValue="Michel" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" defaultValue="Petit" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="michel.petit@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="birthdate">Date de naissance</Label>
                            <Input id="birthdate" type="date" defaultValue="1985-06-15" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Genre</Label>
                            <select 
                              id="gender"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              defaultValue="male"
                            >
                              <option value="male">Homme</option>
                              <option value="female">Femme</option>
                              <option value="other">Autre</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Textarea 
                            id="address" 
                            defaultValue="12 rue des Lilas, 75020 Paris"
                            className="min-h-24"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            Enregistrer les modifications
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="medical">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-semibold">Informations médicales</CardTitle>
                      <FileEdit className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="allergies">Allergies</Label>
                          <Textarea 
                            id="allergies" 
                            placeholder="Listez vos allergies connues"
                            defaultValue="Pénicilline, arachides"
                            className="min-h-20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="chronic">Maladies chroniques</Label>
                          <Textarea 
                            id="chronic" 
                            placeholder="Listez vos maladies chroniques"
                            defaultValue="Asthme"
                            className="min-h-20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="medications">Médicaments actuels</Label>
                          <Textarea 
                            id="medications" 
                            placeholder="Listez les médicaments que vous prenez actuellement"
                            defaultValue="Ventoline (2 inhalations matin et soir)"
                            className="min-h-20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="surgeries">Antécédents chirurgicaux</Label>
                          <Textarea 
                            id="surgeries" 
                            placeholder="Listez vos opérations chirurgicales passées"
                            defaultValue="Appendicectomie (2010)"
                            className="min-h-20"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            Enregistrer les modifications
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insurance">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-semibold">Informations d'assurance</CardTitle>
                      <FileEdit className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="socialNumber">Numéro de sécurité sociale</Label>
                            <Input id="socialNumber" defaultValue="1 85 06 75 123 456 78" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Date d'expiration de la carte vitale</Label>
                            <Input id="cardExpiry" type="date" defaultValue="2025-12-31" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mutuelle">Mutuelle</Label>
                          <Input id="mutuelle" defaultValue="MGEN" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="mutuelleNumber">Numéro d'adhérent mutuelle</Label>
                            <Input id="mutuelleNumber" defaultValue="MG785412369" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mutuelleExpiry">Date de fin de droit mutuelle</Label>
                            <Input id="mutuelleExpiry" type="date" defaultValue="2023-12-31" />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            Enregistrer les modifications
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
