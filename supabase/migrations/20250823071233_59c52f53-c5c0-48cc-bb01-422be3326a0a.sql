-- Create OTP codes table for temporary storage
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('signup', 'signin')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_otp_codes_email_type ON public.otp_codes(email, type);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Enable Row Level Security
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP codes (only backend can access)
CREATE POLICY "Service role can manage OTP codes" 
ON public.otp_codes 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create function to cleanup expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - INTERVAL '1 hour';
END;
$$;

-- Create a trigger to auto-cleanup on insert (basic cleanup)
CREATE OR REPLACE FUNCTION public.trigger_cleanup_otps()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only cleanup occasionally to avoid performance issues
  IF random() < 0.1 THEN
    PERFORM public.cleanup_expired_otps();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_otps_trigger
  AFTER INSERT ON public.otp_codes
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_cleanup_otps();