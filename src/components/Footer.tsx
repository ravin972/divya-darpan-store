import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-divine rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">ॐ</span>
              </div>
              <span className="text-xl font-bold text-gradient">Divine Store</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted destination for authentic spiritual products, blessed by tradition and crafted with devotion.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:text-divine-saffron">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-divine-saffron">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-divine-saffron">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-divine-saffron">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/brands/parivartan" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Parivartan Collection
              </Link>
              <Link to="/brands/anandam" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Anandam Series
              </Link>
              <Link to="/pandit-services" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pandit Services
              </Link>
              <Link to="/priest-booking" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Book a Priest
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Customer Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-divine-saffron" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-divine-saffron" />
                <span className="text-muted-foreground">support@divinestore.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-divine-saffron mt-0.5" />
                <span className="text-muted-foreground">
                  123 Temple Street,<br />
                  Sacred City, India 123456
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for spiritual insights and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-muted/50"
              />
              <Button className="w-full btn-divine text-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Divine Store. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;