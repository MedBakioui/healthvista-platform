
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

type UserType = 'patient' | 'doctor';

export default function AuthForm({ 
  initialTab = 'login', 
  onComplete 
}: { 
  initialTab?: 'login' | 'register',
  onComplete?: (email: string) => void
}) {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('patient');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    acceptTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically call an authentication API
    // For demo, we'll just redirect to appointments
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur TéléSanté.",
    });
    
    if (onComplete) {
      onComplete(loginForm.email);
    } else {
      navigate('/appointments');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.firstName ||
      !registerForm.lastName
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (!registerForm.acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions générales.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically call a registration API
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès.",
    });
    
    if (onComplete) {
      onComplete(registerForm.email);
    } else {
      // Auto login after registration
      setTab('login');
      setLoginForm({
        email: registerForm.email,
        password: registerForm.password,
      });
    }
  };

  return (
    <div className="glass-card p-8 w-full max-w-md mx-auto">
      <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login" className="text-base py-3">
            <User className="mr-2 h-4 w-4" />
            Connexion
          </TabsTrigger>
          <TabsTrigger value="register" className="text-base py-3">
            <UserPlus className="mr-2 h-4 w-4" />
            Inscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-0">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                  Mot de passe oublié?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Se connecter
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Pas encore de compte?{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setTab('register')}
              >
                Créer un compte
              </button>
            </p>
          </form>
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          <form onSubmit={handleRegister} className="space-y-4">
            <RadioGroup 
              defaultValue="patient"
              className="flex space-x-4 mb-6" 
              onValueChange={(v) => setUserType(v as UserType)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient" className="cursor-pointer">Je suis un patient</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doctor" id="doctor" />
                <Label htmlFor="doctor" className="cursor-pointer">Je suis un médecin</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regEmail">Email *</Label>
              <Input
                id="regEmail"
                type="email"
                placeholder="votre@email.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Téléphone</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Votre numéro de téléphone"
                value={registerForm.phoneNumber}
                onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regPassword">Mot de passe *</Label>
              <div className="relative">
                <Input
                  id="regPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Créez un mot de passe sécurisé"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                8 caractères minimum, incluant lettres, chiffres et caractères spéciaux
              </p>
            </div>

            <div className="flex items-start space-x-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                checked={registerForm.acceptTerms}
                onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                J'accepte les{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Conditions générales
                </a>{' '}
                et la{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Politique de confidentialité
                </a>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Créer mon compte
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Déjà un compte?{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setTab('login')}
              >
                Se connecter
              </button>
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
