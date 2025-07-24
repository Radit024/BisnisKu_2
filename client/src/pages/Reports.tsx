import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Target, 
  PieChart, 
  Calendar, 
  Activity,
  Calculator,
  Star
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';

export default function Reports() {
  const { data: financialSummary = {}, isLoading: loadingFinancial } = useQuery({
    queryKey: ['/api/reports/financial'],
  });

  const { data: topProducts = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['/api/reports/top-products'],
  });

  const { data: hpp = [], isLoading: loadingHpp } = useQuery({
    queryKey: ['/api/reports/hpp'],
  });

  const { data: bep = [], isLoading: loadingBep } = useQuery({
    queryKey: ['/api/reports/bep'],
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-semibold">Dashboard Laporan</h1>
              <p className="text-blue-100">Analisis keuangan dan performa bisnis</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-blue-200 text-sm">Pemasukan</p>
              <p className="text-white font-semibold">
                {formatCurrency((financialSummary as any)?.totalIncome || 0)}
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Pengeluaran</p>
              <p className="text-white font-semibold">
                {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Profit</p>
              <p className="text-white font-semibold">
                {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 space-y-12">
        {/* Financial Summary & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Summary Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg font-semibold">Ringkasan Keuangan</CardTitle>
                  <p className="text-blue-100 text-sm">Overview finansial bisnis</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {loadingFinancial ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-700 font-medium mb-1">Total Pemasukan</p>
                        <p className="text-2xl font-bold text-green-800">
                          {formatCurrency((financialSummary as any)?.totalIncome || 0)}
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-700 font-medium mb-1">Total Pengeluaran</p>
                        <p className="text-2xl font-bold text-red-800">
                          {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
                        </p>
                      </div>
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-700 font-medium mb-1">Keuntungan Bersih</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
                        </p>
                      </div>
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Products Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg font-semibold">Produk Terlaris</CardTitle>
                  <p className="text-blue-100 text-sm">Top performer produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {loadingProducts ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(topProducts) && topProducts.length > 0 ? topProducts.map((product: any, index: number) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.productName}</p>
                            <p className="text-purple-600 text-sm">{product.quantitySold} terjual</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(product.totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Belum Ada Data Penjualan
                      </p>
                      <p className="text-gray-500 text-sm">
                        Mulai jual produk untuk melihat analisis terlaris
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg font-semibold">Grafik Penjualan</CardTitle>
                  <p className="text-blue-100 text-sm">Tren performa bisnis</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  <Calendar className="w-4 h-4 mr-1" />
                  7 Hari
                </Button>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  30 Hari
                </Button>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  90 Hari
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-80 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Visualisasi Data
                </h3>
                <p className="text-gray-500 max-w-md mb-4">
                  Grafik interaktif penjualan akan ditampilkan di sini
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Badge className="bg-indigo-100 text-indigo-800">Chart.js Ready</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Interactive</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HPP and BEP Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HPP Analysis Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-3">
                <Calculator className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg font-semibold">Analisis HPP</CardTitle>
                  <p className="text-blue-100 text-sm">Harga Pokok Penjualan per produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {loadingHpp ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(hpp) && hpp.length > 0 ? hpp.map((item: any, index: number) => (
                    <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                        <Badge className="bg-orange-100 text-orange-800">HPP</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-orange-700 font-medium text-sm mb-1">Biaya Produksi</p>
                          <p className="text-lg font-bold text-orange-800">
                            {formatCurrency(item.productionCost)}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-orange-700 font-medium text-sm mb-1">HPP per Unit</p>
                          <p className="text-lg font-bold text-orange-800">
                            {formatCurrency(item.hpp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-orange-100 rounded-lg p-3">
                        <p className="text-orange-700 font-medium text-sm mb-2">Harga Jual Minimal (30% margin)</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Rekomendasi:</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(item.hpp * 1.3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Data HPP</p>
                      <p className="text-gray-500 text-sm">Mulai input biaya produksi untuk analisis HPP</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* BEP Analysis Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg font-semibold">Analisis BEP</CardTitle>
                  <p className="text-blue-100 text-sm">Break Even Point per produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {loadingBep ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(bep) && bep.length > 0 ? bep.map((item: any, index: number) => (
                    <div key={index} className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                        <Badge className="bg-cyan-100 text-cyan-800">BEP</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-cyan-700 font-medium text-sm mb-1">Fixed Cost</p>
                          <p className="text-lg font-bold text-cyan-800">
                            {formatCurrency(item.fixedCost)}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-cyan-700 font-medium text-sm mb-1">Variable Cost/Unit</p>
                          <p className="text-lg font-bold text-cyan-800">
                            {formatCurrency(item.variableCost)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-cyan-100 rounded-lg p-3">
                        <p className="text-cyan-700 font-medium text-sm mb-2">Break Even Point</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Unit yang harus dijual:</span>
                            <span className="text-lg font-bold text-blue-600">
                              {item.bepUnit} unit
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Revenue yang dibutuhkan:</span>
                            <span className="text-lg font-bold text-green-600">
                              {formatCurrency(item.bepRevenue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Data BEP</p>
                      <p className="text-gray-500 text-sm">Input fixed cost dan variable cost untuk analisis BEP</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
