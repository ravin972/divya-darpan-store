import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Parivartan() {
  const features = [
    {
      icon: <Star className="h-8 w-8 text-divine-gold" />,
      title: "Premium Quality",
      description: "Handcrafted spiritual products made with traditional techniques and blessed ingredients."
    },
    {
      icon: <Heart className="h-8 w-8 text-divine-saffron" />,
      title: "Authentic Rituals",
      description: "Each product is blessed through authentic Vedic rituals performed by experienced priests."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-divine-gold" />,
      title: "Spiritual Transformation",
      description: "Products designed to enhance your spiritual journey and bring positive energy to your life."
    }
  ];

  const products = [
    {
      name: "Sacred Diyas",
      description: "Traditional brass diyas for festivals and daily prayers",
      image: "/src/assets/brass-diyas.jpg"
    },
    {
      name: "Copper Thali Set",
      description: "Authentic copper thali for puja ceremonies",
      image: "/src/assets/copper-thali.jpg"
    },
    {
      name: "Ganesh Idol",
      description: "Beautifully crafted Ganesh idol for blessings",
      image: "/src/assets/ganesh-idol.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-temple py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Parivartan
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience spiritual transformation through our carefully curated collection of sacred products. 
            Each item in our Parivartan collection is blessed and crafted to bring positive energy and 
            divine blessings into your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-divine">
              <Link to="/products?brand=Parivartan">
                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/priest-booking">Book a Blessing Ceremony</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Why Choose Parivartan?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-divine text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
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

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gradient-sunset">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="card-divine overflow-hidden hover:shadow-glow transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient">
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the transformative power of authentic spiritual products. 
            Let Parivartan guide you towards inner peace and divine connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-divine">
              <Link to="/products?brand=Parivartan">Shop Parivartan Collection</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth">Create Account for Exclusive Offers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}