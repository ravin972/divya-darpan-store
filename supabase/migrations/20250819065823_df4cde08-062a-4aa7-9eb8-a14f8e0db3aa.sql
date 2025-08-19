-- Create pandits table for pandit registrations
CREATE TABLE public.pandits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_years integer NOT NULL,
  specialization text NOT NULL,
  languages text[] NOT NULL DEFAULT '{}',
  education text,
  certifications text,
  bio text,
  price_per_hour integer NOT NULL,
  location text,
  profile_image text,
  verification_status text NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pandits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Pandits can view their own profile" 
ON public.pandits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Pandits can update their own profile" 
ON public.pandits 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create pandit profile" 
ON public.pandits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Approved pandits are viewable by everyone" 
ON public.pandits 
FOR SELECT 
USING (verification_status = 'approved');

CREATE POLICY "Admins can manage all pandit profiles" 
ON public.pandits 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pandits_updated_at
BEFORE UPDATE ON public.pandits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create bookings table for pandit bookings
CREATE TABLE public.pandit_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pandit_id uuid NOT NULL REFERENCES public.pandits(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration_hours integer NOT NULL DEFAULT 2,
  location text NOT NULL,
  special_requirements text,
  contact_phone text NOT NULL,
  contact_email text NOT NULL,
  total_amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.pandit_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.pandit_bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.pandit_bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.pandit_bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Pandits can view their bookings" 
ON public.pandit_bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.pandits 
    WHERE id = pandit_bookings.pandit_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Pandits can update their bookings" 
ON public.pandit_bookings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.pandits 
    WHERE id = pandit_bookings.pandit_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all bookings" 
ON public.pandit_bookings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for bookings timestamp updates
CREATE TRIGGER update_pandit_bookings_updated_at
BEFORE UPDATE ON public.pandit_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();