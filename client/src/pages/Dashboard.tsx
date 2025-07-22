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
  CheckCircle,
  Calendar,
  Package,
  Activity,
  BarChart3,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Star,
  Zap
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { Link } from 'wouter';

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
  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ['/api/dashboard/summary'],
  });

  const { data: recentTransactions } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions/recent'],
  });

  const { data: stockItems } = useQuery<StockItem[]>({
    queryKey: ['/api/stock'],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Hero */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-lg w-2/3 mb-2"></div>
          <div className="h-4 bg-white/20 rounded-lg w-1/2"></div>
        </div>
        {/* Loading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Header - Completely Redesigned */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Welcome Section */}
            <div className="lg:col-span-8">
              <div className="flex items-start space-x-6">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                  <div className="relative">
                    <Zap className="w-12 h-12 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-bold">Halo, Pengusaha! </h1>
                    <span className="text-3xl animate-bounce">👋</span>
                  </div>
                  <p className="text-blue-100 text-xl mb-4">
                    Selamat pagi! Mari kita lihat bagaimana bisnis Anda berkembang hari ini
                  </p>
                  
                  {/* Status Indicators */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-200 text-sm font-medium">Sistem Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-200" />
                      <span className="text-blue-200 text-sm">Aktivitas Tinggi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-200" />
                      <span className="text-purple-200 text-sm">Target 85% Tercapai</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/transactions">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                    <Plus className="w-4 h-4 mr-2" />
                    Transaksi Baru
                  </Button>
                </Link>
                <Link href="/stock">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                    <Package className="w-4 h-4 mr-2" />
                    Kelola Stok
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Lihat Laporan
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats Dashboard */}
            <div className="lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg">Dashboard Hari Ini</h3>
                  <Calendar className="w-5 h-5 text-blue-200" />
                </div>
                
                <div className="space-y-4">
                  {/* Date & Time */}
                  <div className="text-center">
                    <p className="text-white font-bold text-xl">
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                    <p className="text-blue-200 text-sm">
                      {new Date().toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })} WIB
                    </p>
                  </div>
                  
                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Users className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">24</p>
                      <p className="text-blue-200 text-xs">Pelanggan</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Target className="w-5 h-5 text-green-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">85%</p>
                      <p className="text-green-200 text-xs">Target</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Star className="w-5 h-5 text-yellow-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">4.8</p>
                      <p className="text-yellow-200 text-xs">Rating</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Activity className="w-5 h-5 text-purple-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">High</p>
                      <p className="text-purple-200 text-xs">Aktivitas</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Progress Harian</span>
                      <span className="text-white font-medium">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  {/* Weather-like Info */}
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">Performa Bisnis</span>
                      </div>
                      <span className="text-green-300 text-sm font-bold">Excellent</span>
                    </div>
                    <p className="text-blue-200 text-xs mt-1">Penjualan meningkat 15% dari kemarin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-700">Penjualan Hari Ini</p>
                </div>
                <p className="text-3xl font-bold text-green-900 mb-2">
                  {formatCurrency(summary?.todayIncome || 0)}
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+15% dari kemarin</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <DollarSign className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-red-700">Pengeluaran</p>
                </div>
                <p className="text-3xl font-bold text-red-900 mb-2">
                  {formatCurrency(summary?.todayExpenses || 0)}
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">-5% dari kemarin</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <TrendingDown className="w-16 h-16 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-blue-700">Keuntungan Bersih</p>
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-2">
                  {formatCurrency((summary?.todayIncome || 0) - (summary?.todayExpenses || 0))}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-600 font-medium">
                    Margin: {summary?.todayIncome ? Math.round(((summary.todayIncome - (summary.todayExpenses || 0)) / summary.todayIncome) * 100) : 0}%
                  </span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <DollarSign className="w-16 h-16 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <ShoppingCart className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-purple-700">Produk Terjual</p>
                </div>
                <p className="text-3xl font-bold text-purple-900 mb-2">
                  {summary?.productsSold || 0}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-purple-600 font-medium">Unit hari ini</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <ShoppingCart className="w-16 h-16 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Stock Section */}
      <Card className="border-0 bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <div className="bg-blue-100 p-2 rounded-xl mr-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="block">Inventori Stok</span>
                <span className="text-sm font-normal text-gray-500">Monitor stok produk Anda</span>
              </div>
              {stockItems && stockItems.length > 0 && (
                <Badge className="ml-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {stockItems.length} Item
                </Badge>
              )}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Detail
              </Button>
              <Link href="/stock">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Kelola Stok
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {stockItems && stockItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockItems.slice(0, 6).map((item, index) => {
                const getStockStatus = (stock: number) => {
                  if (stock <= 10) return { 
                    status: 'Rendah', 
                    color: 'bg-red-50 border-red-200', 
                    badge: 'destructive', 
                    textColor: 'text-red-600',
                    icon: '⚠️'
                  };
                  if (stock <= 30) return { 
                    status: 'Sedang', 
                    color: 'bg-yellow-50 border-yellow-200', 
                    badge: 'secondary', 
                    textColor: 'text-yellow-600',
                    icon: '⚡'
                  };
                  return { 
                    status: 'Aman', 
                    color: 'bg-green-50 border-green-200', 
                    badge: 'default', 
                    textColor: 'text-green-600',
                    icon: '✅'
                  };
                };

                const stockStatus = getStockStatus(item.currentStock);

                return (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-xl border-2 ${stockStatus.color} hover:shadow-lg transition-all duration-200 hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{stockStatus.icon}</span>
                        <h4 className="font-semibold text-gray-900">{item.itemName}</h4>
                      </div>
                      <Badge variant={stockStatus.badge as any} className="text-xs">
                        {stockStatus.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Stok Tersedia</p>
                        <p className={`text-lg font-bold ${stockStatus.textColor}`}>
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <div className={`w-16 h-2 rounded-full bg-gray-200 overflow-hidden`}>
                        <div 
                          className={`h-full transition-all duration-500 ${
                            item.currentStock <= 10 ? 'bg-red-500' :
                            item.currentStock <= 30 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(item.currentStock / 50 * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada data stok</h3>
              <p className="text-gray-500 mb-6">Mulai tambahkan produk untuk memantau inventori Anda</p>
              <Link href="/stock">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Produk Pertama
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Recent Transactions */}
      <Card className="border-0 bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <div className="bg-purple-100 p-2 rounded-xl mr-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <span className="block">Aktivitas Terbaru</span>
                <span className="text-sm font-normal text-gray-500">Transaksi terkini hari ini</span>
              </div>
            </CardTitle>
            <Link href="/transactions">
              <Button variant="outline" className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Semua
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentTransactions && recentTransactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentTransactions.slice(0, 5).map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {transaction.description}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(transaction.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                            {transaction.type === 'income' ? '💰 Pemasukan' : '💸 Pengeluaran'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </p>
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'destructive'}
                        className={`mt-1 ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {transaction.type === 'income' ? 'Masuk' : 'Keluar'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada transaksi</h3>
              <p className="text-gray-500 mb-6">Mulai catat penjualan pertama Anda untuk melihat aktivitas di sini</p>
              <Link href="/transactions">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Transaksi Pertama
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
