import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  ArrowRight,
  Heart,
  Flame,
  Sparkles,
  Bell
} from 'lucide-react';

export default function PanditServices() {
  const services = [
    {
      id: 1,
      name: "Wedding Ceremonies",
      description: "Complete Vedic wedding rituals with traditional customs and blessings",
      price: "₹15,000 - ₹50,000",
      duration: "4-6 hours",
      icon: <Heart className="h-8 w-8 text-divine-saffron" />,
      features: ["Traditional rituals", "Sacred mantras", "Photography coordination", "Personalized ceremony"]
    },
    {
      id: 2,
      name: "Griha Pravesh Puja",
      description: "House warming ceremony for new homes with Vastu blessings",
      price: "₹5,000 - ₹15,000",
      duration: "2-3 hours",
      icon: <Sparkles className="h-8 w-8 text-divine-gold" />,
      features: ["Vastu consultation", "Home purification", "Prosperity rituals", "Protection mantras"]
    },
    {
      id: 3,
      name: "Havan & Fire Ceremonies",
      description: "Sacred fire rituals for various occasions and spiritual purposes",
      price: "₹3,000 - ₹10,000",
      duration: "1-2 hours",
      icon: <Flame className="h-8 w-8 text-divine-saffron" />,
      features: ["Sacred fire setup", "Vedic mantras", "Offerings guidance", "Spiritual consultation"]
    },
    {
      id: 4,
      name: "Festival Celebrations",
      description: "Traditional festival pujas including Diwali, Navratri, and more",
      price: "₹2,000 - ₹8,000",
      duration: "1-3 hours",
      icon: <Bell className="h-8 w-8 text-divine-gold" />,
      features: ["Festival rituals", "Community ceremonies", "Cultural guidance", "Traditional decorations"]
    }
  ];

  const featuredPandits = [
    {
      name: "Pandit Rajesh Sharma",
      experience: "15+ years",
      specialization: "Wedding Ceremonies",
      languages: ["Hindi", "Sanskrit", "English"],
      rating: 4.9,
      reviews: 150,
      price: "₹2,000/hour",
      image: "/placeholder-pandit.jpg"
    },
    {
      name: "Pandit Mohan Tripathi",
      experience: "20+ years",
      specialization: "Griha Pravesh & Vastu",
      languages: ["Hindi", "Sanskrit", "Gujarati"],
      rating: 4.8,
      reviews: 120,
      price: "₹1,800/hour",
      image: "/placeholder-pandit.jpg"
    },
    {
      name: "Pandit Suresh Pandey",
      experience: "12+ years",
      specialization: "Havan & Fire Ceremonies",
      languages: ["Hindi", "Sanskrit", "Marathi"],
      rating: 4.9,
      reviews: 95,
      price: "₹1,500/hour",
      image: "/placeholder-pandit.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-temple py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Pandit Services
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced and knowledgeable priests for all your spiritual ceremonies. 
            Our verified pandits bring authentic Vedic traditions to your special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-divine">
              <Link to="/priest-booking">
                Book a Pandit Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="#services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="card-divine hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-sunset rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="text-divine-saffron border-divine-saffron">
                          {service.price}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-divine-saffron rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/priest-booking">Book This Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pandits */}
      <section className="py-16 px-4 bg-gradient-sunset">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Featured Pandits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPandits.map((pandit, index) => (
              <Card key={index} className="card-divine text-center hover:shadow-glow transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-divine flex items-center justify-center">
                      <span className="text-primary-foreground text-2xl font-bold">
                        {pandit.name.split(' ')[1].charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{pandit.name}</h3>
                  <Badge className="mb-3 bg-divine-saffron text-primary-foreground">
                    {pandit.specialization}
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-1" />
                      {pandit.experience}
                    </div>
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 mr-1 fill-divine-gold text-divine-gold" />
                      {pandit.rating} ({pandit.reviews} reviews)
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {pandit.languages.map((lang, langIndex) => (
                        <Badge key={langIndex} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-lg font-semibold text-divine-saffron mb-4">
                    {pandit.price}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Why Choose Our Pandit Services?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-divine text-center">
              <CardContent className="pt-8">
                <div className="p-4 bg-gradient-divine rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Experts</h3>
                <p className="text-muted-foreground">
                  All our pandits are verified, experienced professionals with authentic knowledge of Vedic traditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-divine text-center">
              <CardContent className="pt-8">
                <div className="p-4 bg-gradient-divine rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Convenient Booking</h3>
                <p className="text-muted-foreground">
                  Easy online booking system with flexible scheduling to match your requirements and timing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-divine text-center">
              <CardContent className="pt-8">
                <div className="p-4 bg-gradient-divine rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Rituals</h3>
                <p className="text-muted-foreground">
                  Traditional ceremonies performed according to authentic Vedic scriptures and customs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-temple">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient">
            Ready to Book Your Ceremony?
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Let our experienced pandits guide you through meaningful spiritual ceremonies 
            that connect you with divine blessings and traditional wisdom.
          </p>
          <Button asChild className="btn-divine">
            <Link to="/priest-booking">Book a Pandit Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}