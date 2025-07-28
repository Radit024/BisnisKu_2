import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, handleRedirectResult } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Then set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        user.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            // Simpan token atau kirim ke backend
            localStorage.setItem('idToken', idToken);
            // Atau langsung kirim ke backend
          })
          .catch(function(error) {
            console.error('Failed to get ID token:', error);
          });
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
