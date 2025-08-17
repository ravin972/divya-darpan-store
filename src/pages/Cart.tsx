import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const serviceFee = 50;
  const deliveryFee = state.total > 1000 ? 0 : 100;
  const discount = couponCode === 'DIVINE10' ? Math.round(state.total * 0.1) : 0;
  const finalTotal = state.total + serviceFee + deliveryFee - discount;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our divine collection of spiritual products
            </p>
            <Link to="/products">
              <Button className="btn-divine">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {state.itemCount} items in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.product.id} className="card-divine">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                          <Badge className="mt-1 bg-divine-saffron text-primary-foreground">
                            {item.product.brand}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.product.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="card-divine">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} items)</span>
                  <span>₹{state.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{serviceFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (DIVINE10)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>

                <Button className="w-full btn-divine">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Coupon Code */}
            <Card className="card-divine">
              <CardHeader>
                <CardTitle className="text-lg">Apply Coupon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
                {couponCode === 'DIVINE10' && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ 10% discount applied!
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try: DIVINE10 for 10% off
                </p>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="card-divine">
              <CardContent className="p-4">
                <div className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Free delivery on orders above ₹1,000</span>
                    {state.total > 1000 ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Add ₹{(1000 - state.total).toLocaleString()} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    Estimated delivery: 3-5 business days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;