import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flower, Music, Flame, ArrowRight, BookOpen, Users } from 'lucide-react';

export default function Anandam() {
  const features = [
    {
      icon: <Flower className="h-8 w-8 text-divine-gold" />,
      title: "Pure Bliss",
      description: "Experience the ultimate joy and spiritual bliss through our meditation and wellness products."
    },
    {
      icon: <Music className="h-8 w-8 text-divine-saffron" />,
      title: "Harmonious Living",
      description: "Create harmony in your daily life with our carefully selected spiritual accessories."
    },
    {
      icon: <Flame className="h-8 w-8 text-divine-gold" />,
      title: "Inner Awakening",
      description: "Awaken your inner consciousness with products designed for deep spiritual practice."
    }
  ];

  const experiences = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Guided Meditation",
      description: "Learn traditional meditation techniques with our expert guidance and tools."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Satsang",
      description: "Join our spiritual community for regular satsang and group meditations."
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: "Sacred Fire Ceremonies",
      description: "Participate in authentic homa and havan ceremonies for purification."
    }
  ];

  const products = [
    {
      name: "Rudraksha Mala",
      description: "Sacred beads for meditation and spiritual protection",
      image: "/src/assets/rudraksha-mala.jpg",
      benefits: ["Enhances concentration", "Spiritual protection", "Stress relief"]
    },
    {
      name: "Incense Collection",
      description: "Premium incense for meditation and prayers",
      image: "/src/assets/incense-collection.jpg",
      benefits: ["Purifies atmosphere", "Aids meditation", "Creates sacred space"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-divine py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 text-primary-foreground">
            Anandam
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Journey into the realm of pure bliss and eternal joy. Anandam represents the highest 
            state of spiritual consciousness, where the soul experiences infinite peace and divine happiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/products?brand=Anandam">
                Discover Anandam <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/priest-booking">Book Spiritual Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gradient">The Path to Anandam</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In the ancient Sanskrit tradition, Anandam represents one of the three fundamental 
              aspects of the ultimate reality - Sat-Chit-Anandam (Existence-Consciousness-Bliss). 
              Our collection is thoughtfully curated to help you experience this divine joy in your daily spiritual practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-divine text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4 group-hover:animate-pulse">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Experiences */}
      <section className="py-16 px-4 bg-gradient-sunset">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Spiritual Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((experience, index) => (
              <Card key={index} className="card-divine hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-divine-gold/10 rounded-full">
                      {experience.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{experience.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Sacred Instruments for Bliss
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <Card key={index} className="card-divine overflow-hidden group">
                <div className="md:flex">
                  <div className="md:w-1/2 aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                        <p className="text-muted-foreground mb-4">{product.description}</p>
                        <div className="space-y-2 mb-6">
                          <h4 className="font-semibold text-sm text-divine-saffron">Benefits:</h4>
                          <ul className="space-y-1">
                            {product.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-divine-gold rounded-full"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Button className="btn-divine w-full">
                        Explore Product
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gradient-temple">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient">
            Experience Shared by Seekers
          </h2>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl italic text-foreground mb-6 leading-relaxed">
              "Through Anandam's meditation tools and guidance, I discovered a peace I never knew existed. 
              The Rudraksha mala has become an integral part of my daily practice, bringing clarity and 
              divine connection to every moment."
            </blockquote>
            <cite className="text-divine-saffron font-semibold">- Seeker on the Path</cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient">
            Begin Your Journey to Anandam
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards experiencing divine bliss. Our products and guidance 
            will support your journey to inner peace and spiritual awakening.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-divine">
              <Link to="/products?brand=Anandam">Shop Anandam Collection</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/priest-booking">Schedule a Spiritual Session</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}