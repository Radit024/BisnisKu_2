import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Filter,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import TransactionForm from '@/components/TransactionForm';

export default function Transactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
  });

  // Mock data for summary stats
  const todayStats = {
    income: 2500000,
    expense: 750000,
    profit: 1750000,
    transactionCount: 12
  };

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
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header Section - Completely redesigned */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
        </div>
        
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mr-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      Penjualan & Transaksi
                    </h1>
                    <p className="text-xl text-blue-100">
                      Dashboard lengkap untuk mengelola keuangan bisnis Anda
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">💼 Bisnis Aktif</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">📊 Real-time Analytics</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">🔒 Secure</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-white mr-3" />
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-blue-200 text-sm">Today's Business Session</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-2xl font-bold">{todayStats.transactionCount}</p>
                    <p className="text-blue-200 text-xs">Transaksi</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-lg font-bold">
                      {Math.round((todayStats.profit / todayStats.income) * 100)}%
                    </p>
                    <p className="text-blue-200 text-xs">Margin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards with Advanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-8 relative z-10">
        <Card className="group bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1">
                  +12%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-green-700 mb-2">💰 Pemasukan Hari Ini</p>
              <p className="text-3xl font-bold text-green-900 mb-2">{formatCurrency(todayStats.income)}</p>
              <div className="flex items-center">
                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">Naik dari kemarin</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1">
                  -3%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-red-700 mb-2">📉 Pengeluaran Hari Ini</p>
              <p className="text-3xl font-bold text-red-900 mb-2">{formatCurrency(todayStats.expense)}</p>
              <div className="flex items-center">
                <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600 font-medium">Turun dari kemarin</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1">
                  {Math.round((todayStats.profit / todayStats.income) * 100)}%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-blue-700 mb-2">💎 Keuntungan Bersih</p>
              <p className="text-3xl font-bold text-blue-900 mb-2">{formatCurrency(todayStats.profit)}</p>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  Margin: {Math.round((todayStats.profit / todayStats.income) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1">
                  Hari ini
                </Badge>
              </div>
              <p className="text-sm font-semibold text-purple-700 mb-2">📊 Total Transaksi</p>
              <p className="text-3xl font-bold text-purple-900 mb-2">{todayStats.transactionCount}</p>
              <div className="flex items-center">
                <span className="text-sm text-purple-600 font-medium">Transaksi aktif</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
        {/* Enhanced Transaction Form Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl mr-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Transaksi Baru</h3>
                  <p className="text-gray-600">Catat penjualan atau pengeluaran bisnis</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg px-4 py-2">
                  <span className="text-sm font-semibold text-gray-700">🚀 Quick Entry</span>
                </div>
              </div>
            </div>
            <TransactionForm />
          </div>
        </div>

        {/* Enhanced Transaction History Section */}
        <Card className="shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-slate-800 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">Riwayat Transaksi</CardTitle>
                  <p className="text-gray-300 text-sm">Track semua aktivitas keuangan</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border border-white/30">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border border-white/30">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {(transactions as any[]).map((transaction: any, index: number) => (
                      <div key={transaction.id || index} 
                           className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                              transaction.type === 'income' 
                                ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                                : 'bg-gradient-to-br from-red-100 to-rose-100'
                            }`}>
                              {getPaymentIcon(transaction.paymentMethod)}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">
                                {transaction.description}
                              </p>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(transaction.date).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  transaction.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' : 
                                  transaction.paymentMethod === 'bank_transfer' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {transaction.paymentMethod === 'cash' ? '💵 Tunai' : 
                                   transaction.paymentMethod === 'bank_transfer' ? '🏦 Transfer' : '📱 E-wallet'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-xl mb-1 ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                            </p>
                            <Badge 
                              className={`text-xs font-semibold ${
                                transaction.type === 'income' 
                                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200' 
                                  : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 hover:from-red-200 hover:to-rose-200'
                              }`}
                            >
                              {transaction.type === 'income' ? '📈 Pemasukan' : '📉 Pengeluaran'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <FileText className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Belum ada transaksi</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Mulai catat penjualan pertama Anda untuk melihat riwayat transaksi yang lengkap dan terorganisir di sini.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Transaksi Pertama
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
