import { ReactNode } from 'react';
import { Calculator, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { logOut } from '@/lib/auth';
import HorizontalNav from './HorizontalNav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-white rounded-lg w-10 h-10 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-text-main">BisnisCatat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/90">
                <Download className="w-4 h-4 mr-2" />
                Backup Data
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-100 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Horizontal Navigation */}
      <HorizontalNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
