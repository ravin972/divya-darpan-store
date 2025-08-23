-- Fix function search path security warnings
-- Update cleanup_expired_otps function
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - INTERVAL '1 hour';
END;
$$;

-- Update trigger_cleanup_otps function
CREATE OR REPLACE FUNCTION public.trigger_cleanup_otps()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  -- Only cleanup occasionally to avoid performance issues
  IF random() < 0.1 THEN
    PERFORM public.cleanup_expired_otps();
  END IF;
  RETURN NEW;
END;
$$;