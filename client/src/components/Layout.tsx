import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
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
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl w-12 h-12 flex items-center justify-center shadow-lg p-2">
                <img 
                  src="https://img.icons8.com/papercut/50/calculator.png" 
                  alt="BisnisKu Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BisnisKu</h1>
                <p className="text-blue-100 text-xs">Business Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <User className="w-4 h-4 text-white" />
                <span className="text-sm text-white">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Backup
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30 hover:border-red-400/50"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="border-t border-white/20">
            <div className="flex overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                        isActive
                          ? 'border-white text-white bg-white/20 shadow-lg'
                          : 'border-transparent text-blue-100 hover:text-white hover:border-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
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
