import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const PriestBooking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedPriest, setSelectedPriest] = useState('');

  const services = [
    { id: 'ganesh-pooja', name: 'Ganesh Pooja', duration: '2 hours', price: 2500 },
    { id: 'graha-shanti', name: 'Graha Shanti Pooja', duration: '3 hours', price: 5000 },
    { id: 'satyanarayan', name: 'Satyanarayan Pooja', duration: '4 hours', price: 3500 },
    { id: 'wedding', name: 'Wedding Ceremony', duration: '6 hours', price: 15000 },
    { id: 'housewarming', name: 'Griha Pravesh', duration: '2 hours', price: 2000 },
    { id: 'custom', name: 'Custom Ceremony', duration: 'Variable', price: 0 }
  ];

  const priests = [
    {
      id: '1',
      name: 'Pandit Rajesh Sharma',
      experience: '15 years',
      languages: ['Hindi', 'English', 'Sanskrit'],
      specialties: ['Wedding', 'Graha Shanti'],
      rating: 4.9,
      price: 1500
    },
    {
      id: '2',
      name: 'Pandit Suresh Gupta',
      experience: '20 years',
      languages: ['Hindi', 'Gujarati', 'Sanskrit'],
      specialties: ['Ganesh Pooja', 'Satyanarayan'],
      rating: 4.8,
      price: 1200
    },
    {
      id: '3',
      name: 'Pandit Ramesh Joshi',
      experience: '12 years',
      languages: ['Hindi', 'Marathi', 'Sanskrit'],
      specialties: ['Housewarming', 'Custom'],
      rating: 4.7,
      price: 1000
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-temple py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              Book a Priest
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with experienced and verified priests for your spiritual ceremonies
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="space-y-8">
            <Card className="card-divine">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Your Ceremony
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service">Select Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a ceremony" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {service.duration}
                          {service.price > 0 && ` (₹${service.price.toLocaleString()})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priest Selection */}
                <div className="space-y-2">
                  <Label htmlFor="priest">Select Priest (Optional)</Label>
                  <Select value={selectedPriest} onValueChange={setSelectedPriest}>
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-assign or choose priest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-assign best match</SelectItem>
                      {priests.map(priest => (
                        <SelectItem key={priest.id} value={priest.id}>
                          {priest.name} - ₹{priest.price}/hour ({priest.rating}★)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input type="date" id="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input type="time" id="time" />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Ceremony Location</Label>
                  <Textarea 
                    id="location"
                    placeholder="Enter full address where ceremony will be conducted"
                    className="min-h-[80px]"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input type="text" id="name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" placeholder="your.email@example.com" />
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea 
                    id="requirements"
                    placeholder="Any special arrangements, dietary restrictions, or ceremony preferences"
                    className="min-h-[80px]"
                  />
                </div>

                <Button className="w-full btn-divine">
                  Book Priest
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Priests List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Verified Priests</h2>
            
            {priests.map(priest => (
              <Card key={priest.id} className="card-divine">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{priest.name}</h3>
                      <p className="text-muted-foreground">{priest.experience} experience</p>
                    </div>
                    <Badge className="bg-divine-gold text-primary-foreground">
                      {priest.rating}★
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Languages: {priest.languages.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Specialties: {priest.specialties.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">
                        ₹{priest.price}/hour
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPriest(priest.id)}
                      >
                        Select This Priest
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pricing Info */}
            <Card className="card-divine bg-gradient-sunset">
              <CardHeader>
                <CardTitle className="text-lg">Service Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {services.filter(s => s.price > 0).map(service => (
                  <div key={service.id} className="flex justify-between">
                    <span>{service.name}</span>
                    <span className="font-semibold">₹{service.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="text-xs text-muted-foreground mt-4">
                  * Prices may vary based on ceremony complexity and priest selection
                  <br />
                  * Travel charges may apply for locations beyond 25km
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriestBooking;