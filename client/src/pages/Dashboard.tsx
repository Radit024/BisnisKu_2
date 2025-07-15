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
  AlertTriangle
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { Link } from 'wouter';

export default function Dashboard() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary'],
  });

  const { data: recentTransactions } = useQuery({
    queryKey: ['/api/transactions/recent'],
  });

  const { data: lowStockItems } = useQuery({
    queryKey: ['/api/stock/low'],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Selamat datang kembali!</h2>
        <p className="text-gray-600">Ini adalah ringkasan bisnis Anda hari ini</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Penjualan Hari Ini</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(summary?.todayIncome || 0)}
                </p>
              </div>
              <div className="bg-success/10 p-3 rounded-full">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pengeluaran</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(summary?.todayExpenses || 0)}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Keuntungan</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency((summary?.todayIncome || 0) - (summary?.todayExpenses || 0))}
                </p>
              </div>
              <div className="bg-success/10 p-3 rounded-full">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produk Terjual</p>
                <p className="text-2xl font-bold text-secondary">
                  {summary?.productsSold || 0}
                </p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <ShoppingCart className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Aksi Cepat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/transactions">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Catat Penjualan Baru
              </Button>
            </Link>
            <Link href="/production">
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                <Factory className="w-4 h-4 mr-2" />
                Catat Produksi
              </Button>
            </Link>
            <Button className="w-full bg-accent hover:bg-accent/90">
              <FileText className="w-4 h-4 mr-2" />
              Ekspor ke PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Produk Stok Rendah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems?.length ? (
              lowStockItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-text-main">{item.itemName}</p>
                    <p className="text-sm text-gray-600">
                      Stok: {item.currentStock} {item.unit}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Rendah
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Tidak ada stok yang rendah
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-text-main">
              Transaksi Terbaru
            </CardTitle>
            <Link href="/transactions">
              <Button variant="outline">Lihat Semua</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Deskripsi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Jumlah
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions?.map((transaction: any) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-text-main">
                      {new Date(transaction.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-main">
                      {transaction.description}
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      transaction.type === 'income' ? 'text-success' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
