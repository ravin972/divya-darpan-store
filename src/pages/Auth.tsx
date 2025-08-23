import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [activeTab, setActiveTab] = useState('login');
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithGoogle, sendOTP, verifyOTP } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back!"
      });
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signUp(
      formData.email, 
      formData.password,
      {
        first_name: formData.firstName,
        last_name: formData.lastName
      }
    );
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signup Successful",
        description: "Please check your email to verify your account."
      });
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await sendOTP(formData.email, activeTab === 'signup' ? 'signup' : 'signin');
    
    if (error) {
      toast({
        title: "Failed to Send OTP",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setOtpSent(true);
      setOtpEmail(formData.email);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code"
      });
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await verifyOTP(otpEmail, otpCode, activeTab === 'signup' ? 'signup' : 'signin');
    
    if (error) {
      toast({
        title: "OTP Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      if (activeTab === 'signup') {
        // For signup, we still need to create the account after OTP verification
        const { error: signupError } = await signUp(
          otpEmail,
          formData.password,
          {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        );
        
        if (signupError) {
          toast({
            title: "Signup Failed",
            description: signupError.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created Successfully",
            description: "Welcome! Your account has been created."
          });
          navigate('/');
        }
      } else {
        // For signin with OTP, user is already authenticated
        toast({
          title: "Login Successful",
          description: "Welcome back!"
        });
        navigate('/');
      }
    }
    setIsLoading(false);
  };

  const resetOTPFlow = () => {
    setOtpSent(false);
    setOtpCode('');
    setOtpEmail('');
    setAuthMethod('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sunset p-4">
      <Card className="w-full max-w-md card-divine">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gradient">Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-4">
              {!otpSent ? (
                <>
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={authMethod === 'password' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAuthMethod('password')}
                      className="flex-1"
                    >
                      Password
                    </Button>
                    <Button
                      type="button"
                      variant={authMethod === 'otp' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAuthMethod('otp')}
                      className="flex-1"
                    >
                      OTP
                    </Button>
                  </div>

                  {authMethod === 'password' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full btn-divine" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In with Password
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp-email">Email</Label>
                        <Input
                          id="otp-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="button" 
                        onClick={handleSendOTP} 
                        className="w-full btn-divine" 
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send OTP
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-medium">Enter Verification Code</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent a 6-digit code to {otpEmail}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetOTPFlow}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleVerifyOTP} 
                      className="flex-1 btn-divine" 
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify
                    </Button>
                  </div>

                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={handleSendOTP}
                    className="w-full text-sm"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-4">
              {!otpSent ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleSendOTP} 
                    className="w-full btn-divine" 
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Verification Code
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-medium">Verify Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent a 6-digit code to {otpEmail}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-otp">Verification Code</Label>
                    <Input
                      id="signup-otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetOTPFlow}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleVerifyOTP} 
                      className="flex-1 btn-divine" 
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </div>

                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={handleSendOTP}
                    className="w-full text-sm"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Separator className="my-4" />
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue with Google
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-muted-foreground">
          {activeTab === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => setActiveTab('signup')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setActiveTab('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}