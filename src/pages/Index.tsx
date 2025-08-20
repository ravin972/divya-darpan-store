import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Calendar, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-temple.jpg';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useEffect, useState } from "react";

const Index = () => {

  // 👇 backend health check
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/health")
    .then((res) => res.json())
    .then((data) => console.log("✅ Backend Response:", data))
    .catch((err) => console.error("❌ Error:", err));
  }, []);

  const featuredProducts = products.slice(0, 4);
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Divine Products', value: '500+', icon: ShoppingBag },
    { label: 'Ceremonies Completed', value: '2,500+', icon: Calendar },
    { label: 'Customer Rating', value: '4.9/5', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-divine-gold/90 text-primary-foreground">
            Welcome to Divine Store
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
            Your Sacred Journey
            <br />
            <span className="text-gradient bg-gradient-to-r from-divine-gold to-divine-saffron bg-clip-text">
              Starts Here
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover authentic spiritual products, book experienced priests, and embrace the divine with our three sacred brands
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="btn-divine group">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/priest-booking">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
                Book a Priest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-sunset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-divine-saffron rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sacred Brands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three distinct brands serving your spiritual journey with authentic products and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-divine text-center group hover:scale-105 transition-transform">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-divine-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">P</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Parivartan</h3>
                <p className="text-muted-foreground mb-6">
                  Traditional spiritual items and ritual essentials for your daily worship and special ceremonies.
                </p>
                <Link to="/brands/parivartan">
                  <Button variant="outline" className="group-hover:bg-divine-saffron group-hover:text-primary-foreground">
                    Explore Parivartan
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-divine text-center group hover:scale-105 transition-transform">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-divine-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">A</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Anandam</h3>
                <p className="text-muted-foreground mb-6">
                  Premium meditation accessories, healing crystals, and mindfulness products for inner peace.
                </p>
                <Link to="/brands/anandam">
                  <Button variant="outline" className="group-hover:bg-divine-gold group-hover:text-primary-foreground">
                    Explore Anandam
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-divine text-center group hover:scale-105 transition-transform">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">॥</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Priest Booking</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with verified priests and complete ceremony kits for all your spiritual needs.
                </p>
                <Link to="/priest-booking">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Book a Priest
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked divine products to enhance your spiritual practice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="btn-divine">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-divine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of devotees who trust Divine Store for their spiritual needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="bg-white text-divine-saffron hover:bg-white/90">
                Start Shopping
              </Button>
            </Link>
            <Link to="/priest-booking">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-divine-saffron">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
