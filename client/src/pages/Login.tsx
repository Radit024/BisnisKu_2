import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, handleRedirectResult } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Handle redirect result from Google sign-in
    handleRedirectResult()
      .then((result) => {
        if (result?.user) {
          console.log('User signed in:', result.user);
          // User will be automatically redirected by the Router component
          // when the auth state changes
        }
      })
      .catch((error) => {
        console.error('Redirect error:', error);
        toast({
          title: 'Error',
          description: 'Gagal masuk dengan Google',
          variant: 'destructive',
        });
      });
  }, [toast]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: 'Error',
        description: 'Gagal masuk dengan Google',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (isSignUp) {
        await signUpWithEmail(data.email, data.password);
        toast({
          title: 'Berhasil',
          description: 'Akun berhasil dibuat',
        });
        // User will be automatically redirected by the Router component
      } else {
        await signInWithEmail(data.email, data.password);
        toast({
          title: 'Berhasil',
          description: 'Berhasil masuk',
        });
        // User will be automatically redirected by the Router component
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal masuk',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-main">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-text-main mb-2">BisnisCatat</h1>
            <p className="text-gray-600">Pencatatan bisnis sederhana untuk UMKM</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Masuk dengan Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  {...form.register('email')}
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...form.register('password')}
                  className="mt-1"
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isSignUp ? 'Daftar' : 'Masuk'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline ml-1"
                >
                  {isSignUp ? 'Masuk sekarang' : 'Daftar sekarang'}
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
