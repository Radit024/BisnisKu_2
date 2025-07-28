import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart,
  Plus,
  FileText,
  Package,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

// Type definitions for API responses
interface DashboardSummary {
  todayIncome: number;
  todayExpenses: number;
  productsSold: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface StockItem {
  id: string;
  itemName: string;
  currentStock: number;
  unit: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ['/api/dashboard/summary'],
  });

  const { data: recentTransactions } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions/recent'],
  });

  const { data: stockItems } = useQuery<StockItem[]>({
    queryKey: ['/api/stock'],
  });

  // Function to get user's first name or display name
  const getUserDisplayName = () => {
    if (!user) return 'Pengguna';
    
    if (user.displayName) {
      // If user has a display name, get the first name
      const firstName = user.displayName.split(' ')[0];
      return firstName;
    }
    
    if (user.email) {
      // If no display name, use the part before @ in email
      const emailName = user.email.split('@')[0];
      // Capitalize first letter
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    
    return 'Pengguna';
  };

  // Function to get greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return 'Selamat pagi';
    } else if (hour < 17) {
      return 'Selamat siang';
    } else if (hour < 19) {
      return 'Selamat sore';
    } else {
      return 'Selamat malam';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-white/20 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-1/3"></div>
        </div>
        {/* Loading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personalized Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getTimeBasedGreeting()}, {getUserDisplayName()}! 👋
            </h1>
            <p className="text-blue-100">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex space-x-3">
            <Link href="/transactions">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Plus className="w-4 h-4 mr-2" />
                Transaksi
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Laporan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Simplified Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pemasukan</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(summary?.todayIncome || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pengeluaran</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(summary?.todayExpenses || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Keuntungan</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency((summary?.todayIncome || 0) - (summary?.todayExpenses || 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Produk Terjual</p>
                <p className="text-xl font-bold text-gray-900">
                  {summary?.productsSold || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simplified Stock Section */}
      <Card className="bg-white border shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Stok Produk
              {stockItems && stockItems.length > 0 && (
                <Badge className="ml-2 bg-gray-100 text-gray-600">
                  {stockItems.length} Item
                </Badge>
              )}
            </CardTitle>
            <Link href="/stock">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Kelola
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {stockItems && stockItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stockItems.slice(0, 6).map((item) => {
                const isLowStock = item.currentStock <= 10;
                return (
                  <div 
                    key={item.id} 
                    className={`p-3 rounded-lg border ${
                      isLowStock ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.itemName}</h4>
                        <p className={`text-lg font-bold ${
                          isLowStock ? 'text-red-600' : 'text-gray-700'
                        }`}>
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      {isLowStock && (
                        <Badge variant="destructive" className="text-xs">
                          Rendah
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada stok</h3>
              <p className="text-gray-500 mb-4">Tambahkan produk untuk memantau stok</p>
              <Link href="/stock">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simplified Recent Transactions */}
      <Card className="bg-white border shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Transaksi Terbaru
            </CardTitle>
            <Link href="/transactions">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentTransactions && recentTransactions.length > 0 ? (
            <div className="divide-y">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {transaction.description}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada transaksi</h3>
              <p className="text-gray-500 mb-4">Catat transaksi pertama Anda</p>
              <Link href="/transactions">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Transaksi
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
