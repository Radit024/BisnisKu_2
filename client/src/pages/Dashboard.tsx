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
  Factory,
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  PieChart
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

  const { data: lowStockItems } = useQuery<StockItem[]>({
    queryKey: ['/api/stock/low'],
  });

  // Simplified chart data
  const weeklyData = [
    { day: 'Sen', profit: 1300000 },
    { day: 'Sel', profit: 1700000 },
    { day: 'Rab', profit: 1700000 },
    { day: 'Kam', profit: 2300000 },
    { day: 'Jum', profit: 2100000 },
    { day: 'Sab', profit: 2800000 },
    { day: 'Min', profit: 2300000 }
  ];

  const categoryData = [
    { category: 'Makanan', sales: 45, color: 'bg-blue-500' },
    { category: 'Minuman', sales: 25, color: 'bg-green-500' },
    { category: 'Snack', sales: 18, color: 'bg-yellow-500' },
    { category: 'Lainnya', sales: 12, color: 'bg-purple-500' }
  ];

  const maxProfit = Math.max(...weeklyData.map(d => d.profit));

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header - Compact */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-1">
              👋 Selamat datang kembali!
            </h2>
            <p className="text-gray-600">Ringkasan bisnis Anda hari ini</p>
          </div>
          <div className="hidden md:flex items-center bg-white/80 rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-primary mr-2" />
            <div className="text-sm">
              <p className="font-medium text-text-main">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'short', 
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards - More compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-200 border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Penjualan Hari Ini</p>
                <p className="text-xl font-bold text-success">
                  {formatCurrency(summary?.todayIncome || 0)}
                </p>
                <p className="text-xs text-green-600 mt-1">+15% dari kemarin</p>
              </div>
              <div className="bg-success/10 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Pengeluaran</p>
                <p className="text-xl font-bold text-red-600">
                  {formatCurrency(summary?.todayExpenses || 0)}
                </p>
                <p className="text-xs text-red-600 mt-1">-5% dari kemarin</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Keuntungan Bersih</p>
                <p className="text-xl font-bold text-success">
                  {formatCurrency((summary?.todayIncome || 0) - (summary?.todayExpenses || 0))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Margin: {summary?.todayIncome ? Math.round(((summary.todayIncome - (summary.todayExpenses || 0)) / summary.todayIncome) * 100) : 0}%
                </p>
              </div>
              <div className="bg-success/10 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Produk Terjual</p>
                <p className="text-xl font-bold text-secondary">
                  {summary?.productsSold || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Unit hari ini</p>
              </div>
              <div className="bg-secondary/10 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Simplified */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Profit Chart - Simplified */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold text-text-main flex items-center">
              <BarChart3 className="w-4 h-4 text-success mr-2" />
              Keuntungan 7 Hari Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-end justify-between h-32 space-x-2">
              {weeklyData.map((day, index) => {
                const height = (day.profit / maxProfit) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-center justify-end h-24 mb-2">
                      <div className="text-xs text-gray-600 mb-1 font-medium">
                        {formatCurrency(day.profit)}
                      </div>
                      <div 
                        className="w-8 bg-gradient-to-t from-success to-success/70 rounded-t-md transition-all duration-500 ease-out"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{day.day}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">Total Keuntungan Minggu Ini</p>
              <p className="text-sm font-bold text-success">
                {formatCurrency(weeklyData.reduce((sum, day) => sum + day.profit, 0))}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Sales Chart - Simplified */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold text-text-main flex items-center">
              <PieChart className="w-4 h-4 text-secondary mr-2" />
              Penjualan per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-4 h-4 ${category.color} rounded mr-3`}></div>
                    <span className="text-sm font-medium text-text-main flex-1">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 ${category.color} rounded-full transition-all duration-500`}
                        style={{ width: `${category.sales}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-text-main w-8 text-right">{category.sales}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">Kategori Terlaris</p>
              <p className="text-sm font-bold text-secondary">Makanan (45%)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock - Full width */}
      <Card className="border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-text-main flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
            Stok Rendah
            {lowStockItems && lowStockItems.length > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {lowStockItems.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lowStockItems && lowStockItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockItems.slice(0, 6).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex-1">
                    <p className="font-medium text-text-main text-sm">{item.itemName}</p>
                    <p className="text-xs text-gray-600">
                      Stok: <span className="font-semibold text-red-600">{item.currentStock}</span> {item.unit}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Rendah
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Semua stok dalam kondisi baik</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions - Compact table */}
      <Card className="border-0 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-text-main flex items-center">
              <FileText className="w-4 h-4 mr-2 text-secondary" />
              Transaksi Terbaru
            </CardTitle>
            <Link href="/transactions">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            {recentTransactions && recentTransactions.length > 0 ? (
              <div className="space-y-2">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center flex-1">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-text-main">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-sm ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </span>
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {transaction.type === 'income' ? '💰' : '💸'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">Belum ada transaksi hari ini</p>
                <Link href="/transactions">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Transaksi
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
