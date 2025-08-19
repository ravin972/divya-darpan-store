import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface PanditRegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PanditRegistrationForm = ({ onSuccess, onCancel }: PanditRegistrationFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>(['Hindi']);
  const [newLanguage, setNewLanguage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    experience_years: '',
    specialization: '',
    education: '',
    certifications: '',
    bio: '',
    price_per_hour: '',
    location: ''
  });

  const specializations = [
    'Wedding Ceremonies',
    'Griha Pravesh & Vastu',
    'Havan & Fire Ceremonies',
    'Festival Celebrations',
    'Puja & Rituals',
    'Astrological Consultations',
    'Spiritual Guidance',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages(prev => [...prev, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(prev => prev.filter(l => l !== lang));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register as a pandit.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('pandits')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience_years: parseInt(formData.experience_years),
          specialization: formData.specialization,
          languages: languages,
          education: formData.education,
          certifications: formData.certifications,
          bio: formData.bio,
          price_per_hour: parseInt(formData.price_per_hour),
          location: formData.location
        });

      if (error) throw error;

      toast({
        title: "Registration Submitted",
        description: "Your pandit registration has been submitted for review. You will be notified once it's approved.",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card-divine max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-gradient">
          Become a Pandit
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Join our platform to offer your spiritual services to the community
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.experience_years}
                  onChange={(e) => handleInputChange('experience_years', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price per Hour (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="500"
                  max="10000"
                  value={formData.price_per_hour}
                  onChange={(e) => handleInputChange('price_per_hour', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialization">Specialization *</Label>
              <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Languages *</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                      {lang}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeLanguage(lang)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a language"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="e.g., Vedic Studies, Sanskrit, etc."
              />
            </div>

            <div>
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="e.g., Certified Vedic Priest, etc."
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio / About Yourself</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about your spiritual journey and expertise..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 btn-divine"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PanditRegistrationForm;