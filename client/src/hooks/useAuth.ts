import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, handleRedirectResult } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect result first
    handleRedirectResult()
      .then((result) => {
        if (result?.user) {
          console.log('Google sign-in redirect successful:', result.user);
          setUser(result.user);
          setLoading(false);
          
          // Show success toast for Google login
          toast({
            title: 'Selamat datang! 👋',
            description: 'Anda berhasil masuk dengan Google',
          });
        }
      })
      .catch((error) => {
        console.error('Redirect result error:', error);
        if (error.code && error.code !== 'auth/popup-closed-by-user') {
          toast({
            title: 'Error',
            description: 'Gagal masuk dengan Google',
            variant: 'destructive',
          });
        }
      });

    // Then set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
