import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, MapPin, Phone, ArrowLeft, Home } from 'lucide-react';

export default function CashOnDelivery() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-sunset py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Your order has been successfully placed and will be delivered with Cash on Delivery option.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="card-divine mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Number */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Order Number</span>
                  <span className="text-lg font-bold text-primary">{orderData.orderNumber}</span>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-3">
                <h3 className="font-semibold">Payment Information</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You will pay <strong>₹{orderData.total.toFixed(2)}</strong> in cash when your order is delivered.
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{orderData.address}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Number
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono">{orderData.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card className="card-divine mb-6">
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">Your order has been received and confirmed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">We're preparing your order for dispatch</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Delivery</p>
                    <p className="text-sm text-muted-foreground">Expected delivery in 3-5 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="card-divine mb-8">
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Please keep the exact amount ready for cash payment upon delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Our delivery partner will contact you before delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Please inspect the products before making payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>You can track your order status by contacting our customer support.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="btn-divine flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View More Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}