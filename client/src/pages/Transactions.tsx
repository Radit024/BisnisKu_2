import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Search,
  Download,
  Plus,
  Wallet,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import TransactionForm from '@/components/TransactionForm';

export default function Transactions() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
  });
  
  console.log(transactions)
  
  const todayStats = {
      transactionCount : transactions.length,
      income : transactions
        .filter(transaksi => transaksi.type === "income")
        .reduce((total, transaksi) => total + transaksi.amount, 0),
      expense : transactions
        .filter(transaksi => transaksi.type === "expense")
        .reduce((total, transaksi) => total + transaksi.amount, 0)
  }
  
  todayStats.profit = todayStats.income - todayStats.expense;

  // Mock data for summary stats
  /*const todayStats = {
    income: 2500000,
    expense: 750000,
    profit: 1750000,
    transactionCount: 12
  };*/

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <Wallet className="w-4 h-4 text-green-600" />;
      case 'bank_transfer':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'e_wallet':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Simplified Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              💰 Transaksi & Penjualan
            </h1>
            <p className="text-blue-100">
              Kelola keuangan bisnis Anda dengan mudah
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">{todayStats.transactionCount}</p>
            <p className="text-blue-200 text-sm">Transaksi Hari Ini</p>
          </div>
        </div>
      </div>

      {/* Simplified Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pemasukan</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(todayStats.income)}
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
                  {formatCurrency(todayStats.expense)}
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
                <p className={`text-xl font-bold ${ todayStats.profit < 1 ? 'text-red-600' : 'text-green-600' }`}>
                  {formatCurrency(todayStats.profit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Transaksi</p>
                <p className="text-xl font-bold text-gray-900">
                  {todayStats.transactionCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        {/* Simplified Transaction Form Section */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Transaksi Baru
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <TransactionForm />
          </CardContent>
        </Card>

        {/* Simplified Transaction History */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-gray-600" />
                Riwayat Transaksi
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                  <div className="divide-y">
                    {(transactions as any[]).map((transaction: any, index: number) => (
                      <div key={transaction.id || index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {getPaymentIcon(transaction.paymentMethod)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                            </p>
                            <Badge 
                              variant={transaction.type === 'income' ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {transaction.type === 'income' ? 'Masuk' : 'Keluar'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada transaksi</h3>
                    <p className="text-gray-500 mb-4">
                      Mulai catat transaksi pertama Anda
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Transaksi
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
