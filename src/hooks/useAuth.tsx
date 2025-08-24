import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  sendOTP: (email: string, type: 'signup' | 'signin') => Promise<{ error: any }>;
  verifyOTP: (email: string, code: string, type: 'signup' | 'signin') => Promise<{ error: any }>;
  signInWithOTP: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session);
        if (event === 'SIGNED_IN') {
          console.log('User signed in successfully:', session?.user);
        }
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed:', session?.user);
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const signInWithGoogle = async () => {
    console.log('Starting Google sign in...');
    console.log('Current origin:', window.location.origin);
    console.log('Current URL:', window.location.href);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      console.error('Google sign in error:', error);
    }
    return { error };
  };

  const sendOTP = async (email: string, type: 'signup' | 'signin') => {
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email, type }
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const verifyOTP = async (email: string, code: string, type: 'signup' | 'signin') => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, code, type }
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithOTP = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth?verified=true`
      }
    });
    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      sendOTP,
      verifyOTP,
      signInWithOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};