import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'Parivartan': return 'bg-divine-saffron text-primary-foreground';
      case 'Anandam': return 'bg-divine-gold text-primary-foreground';
      case 'Priest Booking': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="card-divine group cursor-pointer overflow-hidden">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Brand Badge */}
          <Badge className={`absolute top-3 left-3 ${getBrandColor(product.brand)}`}>
            {product.brand}
          </Badge>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          </Button>

          {/* Stock Status */}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute bottom-3 left-3">
              Only {product.stock} left
            </Badge>
          )}
          
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute bottom-3 left-3">
              Out of Stock
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-divine-gold text-divine-gold" />
              <span className="text-xs text-muted-foreground">4.8</span>
            </div>
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{Math.round(product.price * 1.2).toLocaleString()}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              16% OFF
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full btn-divine"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;