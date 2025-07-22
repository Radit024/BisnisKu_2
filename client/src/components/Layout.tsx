import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Calculator, 
  Download, 
  User,
  Gauge, 
  DollarSign, 
  Factory, 
  Package, 
  BarChart3,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { logOut } from '@/lib/auth';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: Gauge },
  { path: '/transactions', label: 'Penjualan', icon: DollarSign },
  { path: '/production', label: 'Produksi', icon: Factory },
  { path: '/stock', label: 'Stok', icon: Package },
  { path: '/reports', label: 'Laporan', icon: BarChart3 },
];

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const [location] = useLocation();

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
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white rounded-lg w-10 h-10 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-text-main">Bisnisku</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="hidden md:block text-sm text-gray-600">
                Halo, <span className="font-medium text-text-main">{user?.displayName || user?.email?.split('@')[0] || 'User'}</span>
              </span>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Backup
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-600 hover:bg-red-50"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="border-t border-gray-100">
            <div className="flex overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                        isActive
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-transparent text-gray-600 hover:text-primary hover:border-primary/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
