import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
      // Auth state will be updated automatically and App.tsx will handle routing
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: 'Error',
        description: 'Gagal masuk dengan Google',
        variant: 'destructive',
      });
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      
      if (isSignUp) {
        await signUpWithEmail(data.email, data.password);
        toast({
          title: 'Selamat! 🎉',
          description: 'Akun Anda berhasil dibuat. Selamat bergabung!',
        });
      } else {
        await signInWithEmail(data.email, data.password);
        toast({
          title: 'Selamat datang kembali! 👋',
          description: 'Anda berhasil masuk ke Bisnisku',
        });
      }
      
      // Auth state will be updated automatically and App.tsx will handle routing
      console.log('Authentication successful, user will be redirected automatically...');
      
    } catch (error: any) {
      console.error('Auth error:', error);
      let errorMessage = 'Terjadi kesalahan';
      
      // Provide more helpful error messages for beginners
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Email tidak terdaftar. Silakan daftar terlebih dahulu.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah. Silakan coba lagi.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email sudah terdaftar. Silakan masuk atau gunakan email lain.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Email atau password tidak valid.';
      }
      
      toast({
        title: 'Ups! 😅',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Calculator className="w-5 h-5" />,
      title: "Pencatatan Mudah",
      description: "Catat transaksi dengan sekali klik"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Data Aman",
      description: "Informasi bisnis Anda terlindungi"
    },
  ];

  return (
    <div className="min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Features (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <div className="bg-primary text-white rounded-2xl w-16 h-16 flex items-center justify-center mr-4">
                <Calculator className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-main">Bisnisku</h1>
                <p className="text-gray-600">Solusi pencatatan bisnis modern</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-text-main mb-6">
              Kelola bisnis Anda dengan mudah
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="bg-white shadow-lg rounded-xl p-3 group-hover:scale-110 transition-transform duration-200">
                    <div className="text-success">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="lg:hidden flex items-center justify-center mb-6">
                <div className="bg-primary text-white rounded-2xl w-16 h-16 flex items-center justify-center">
                  <Calculator className="w-8 h-8" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-text-main">
                {isSignUp ? (
                  <span className="flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-2 text-accent" />
                    Bergabung Sekarang
                  </span>
                ) : (
                  'Selamat Datang Kembali'
                )}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {isSignUp 
                  ? 'Mulai kelola bisnis Anda dengan lebih baik' 
                  : 'Masuk ke akun Anda'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-12 border-2 hover:border-secondary hover:bg-secondary/10 transition-all duration-200 group"
                disabled={isGoogleLoading || isLoading}
              >
                {isGoogleLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-secondary border-t-transparent"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {isSignUp ? 'Daftar' : 'Masuk'} dengan Google
                    </span>
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">atau</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-text-main">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contoh: bisnisku@email.com"
                      {...form.register('email')}
                      className="pl-10 h-12 border-2 focus:border-primary transition-colors duration-200"
                      disabled={isLoading || isGoogleLoading}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-text-main">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isSignUp ? "Minimal 6 karakter" : "Masukkan password Anda"}
                      {...form.register('password')}
                      className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-colors duration-200"
                      disabled={isLoading || isGoogleLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-text-main transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary text-white transition-all duration-200 group shadow-lg"
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {isSignUp ? 'Buat Akun Sekarang' : 'Masuk ke Akun'}
                      </span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Sign Up/Sign In */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                  {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
                </p>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-secondary hover:text-secondary font-semibold text-sm mt-1 hover:underline transition-colors duration-200"
                  disabled={isLoading || isGoogleLoading}
                >
                  {isSignUp ? 'Masuk ke akun yang sudah ada' : 'Daftar gratis sekarang'}
                </button>
              </div>

              {/* Help text for beginners */}
              {isSignUp && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-sm">
                  <div className="flex items-start">
                    <Sparkles className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-text-main font-medium mb-1">Tips untuk pemula:</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>• Gunakan email yang mudah diingat</li>
                        <li>• Password minimal 6 karakter untuk keamanan</li>
                        <li>• Data Anda akan tersimpan dengan aman</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
