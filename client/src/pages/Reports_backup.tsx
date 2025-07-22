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
  Award, 
  PieChart, 
  Calendar, 
  Download, 
  Eye, 
  Activity,
  Calculator,
  ShoppingBag,
  Star
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';

export default function Reports() {
  const { data: financialSummary, isLoading: loadingFinancial } = useQuery({
    queryKey: ['/api/reports/financial'],
  });

  const { data: topProducts, isLoading: loadingProducts } = useQuery({
    queryKey: ['/api/reports/top-products'],
  });

  const { data: hpp, isLoading: loadingHpp } = useQuery({
    queryKey: ['/api/reports/hpp'],
  });

  const { data: bep, isLoading: loadingBep } = useQuery({
    queryKey: ['/api/reports/bep'],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative z-10 px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl shadow-2xl">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                  📊 Dashboard Laporan
                </h1>
                <p className="text-xl text-white/90 font-medium max-w-2xl">
                  Analisis mendalam keuangan dan performa bisnis Anda dengan insight yang actionable
                </p>
              </div>
            </div>
            
            {/* Quick Stats Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-400/20 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-200" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Pemasukan</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency((financialSummary as any)?.totalIncome || 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-400/20 p-3 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-red-200" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Pengeluaran</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-400/20 p-3 rounded-xl">
                    <Target className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Profit</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 flex space-x-3">
          <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-4 h-4 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>

      <div className="px-6 py-12 space-y-12">

      <div className="px-6 py-12 space-y-12">
        {/* Enhanced Financial Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold drop-shadow-sm">
                    💰 Ringkasan Keuangan
                  </CardTitle>
                  <p className="text-white/90 font-medium">Overview finansial bisnis Anda</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
              {loadingFinancial ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="group/item relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-200/20 rounded-full -translate-y-12 translate-x-12 group-hover/item:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-green-700 font-semibold mb-2 flex items-center space-x-2">
                          <span>📈</span>
                          <span>Total Pemasukan</span>
                        </p>
                        <p className="text-3xl font-bold text-green-800">
                          {formatCurrency((financialSummary as any)?.totalIncome || 0)}
                        </p>
                      </div>
                      <div className="bg-green-500/20 p-4 rounded-2xl shadow-lg group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="group/item relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 rounded-2xl p-6 border border-red-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/20 rounded-full -translate-y-12 translate-x-12 group-hover/item:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-red-700 font-semibold mb-2 flex items-center space-x-2">
                          <span>📉</span>
                          <span>Total Pengeluaran</span>
                        </p>
                        <p className="text-3xl font-bold text-red-800">
                          {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
                        </p>
                      </div>
                      <div className="bg-red-500/20 p-4 rounded-2xl shadow-lg group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                        <TrendingDown className="w-8 h-8 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="group/item relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full -translate-y-12 translate-x-12 group-hover/item:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-blue-700 font-semibold mb-2 flex items-center space-x-2">
                          <span>💎</span>
                          <span>Keuntungan Bersih</span>
                        </p>
                        <p className="text-3xl font-bold text-blue-800">
                          {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-2xl shadow-lg group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold drop-shadow-sm">
                    🏆 Produk Terlaris
                  </CardTitle>
                  <p className="text-white/90 font-medium">Top performer produk Anda</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
              {loadingProducts ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl border">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(topProducts) && topProducts.map((product: any, index: number) => (
                    <div key={index} className="group/product relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/20 rounded-full -translate-y-8 translate-x-8 group-hover/product:scale-150 transition-transform duration-500"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{product.productName}</p>
                            <p className="text-purple-600 font-semibold flex items-center space-x-1">
                              <ShoppingBag className="w-4 h-4" />
                              <span>{product.quantitySold} terjual</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(product.totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!Array.isArray(topProducts) || !topProducts.length && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        🎯 Belum Ada Data Penjualan
                      </p>
                      <p className="text-gray-500">
                        Mulai jual produk untuk melihat analisis terlaris
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced HPP & BEP Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold drop-shadow-sm">
                    🧮 HPP Analysis
                  </CardTitle>
                  <p className="text-white/90 font-medium">Harga Pokok Penjualan</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
              {loadingHpp ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(hpp) && hpp.map((item: any, index: number) => (
                    <div key={index} className="group/hpp relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border border-orange-200 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-orange-200/20 rounded-full -translate-y-8 translate-x-8 group-hover/hpp:scale-150 transition-transform duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                            <span>🏭</span>
                            <span>{item.productName}</span>
                          </h4>
                          <Badge className="bg-orange-100 text-orange-800 font-semibold">
                            HPP
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p className="text-gray-600 flex items-center space-x-2">
                              <span>💰</span>
                              <span>Biaya Bahan: {formatCurrency(item.totalMaterialCost)}</span>
                            </p>
                            <p className="text-gray-600 flex items-center space-x-2">
                              <span>📦</span>
                              <span>Total Produksi: {item.totalProduction} buah</span>
                            </p>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-lg">
                            <p className="text-orange-600 font-semibold mb-1">HPP per Unit</p>
                            <p className="text-2xl font-bold text-orange-800">
                              {formatCurrency(item.hppPerUnit)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!Array.isArray(hpp) || !hpp.length && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        📊 Belum Ada Data HPP
                      </p>
                      <p className="text-gray-500">
                        Mulai produksi untuk analisis HPP
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold drop-shadow-sm">
                    🎯 BEP Analysis
                  </CardTitle>
                  <p className="text-white/90 font-medium">Break Even Point</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
              {loadingBep ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(bep) && bep.map((item: any, index: number) => (
                    <div key={index} className="group/bep relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-6 border border-teal-200 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-teal-200/20 rounded-full -translate-y-8 translate-x-8 group-hover/bep:scale-150 transition-transform duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                            <span>🎯</span>
                            <span>{item.productName}</span>
                          </h4>
                          <Badge className="bg-teal-100 text-teal-800 font-semibold">
                            BEP
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p className="text-gray-600 flex items-center space-x-2">
                              <span>🏠</span>
                              <span>Biaya Tetap: {formatCurrency(item.fixedCost)}</span>
                            </p>
                            <p className="text-gray-600 flex items-center space-x-2">
                              <span>💰</span>
                              <span>Harga Jual: {formatCurrency(item.sellingPrice)}</span>
                            </p>
                            <p className="text-gray-600 flex items-center space-x-2">
                              <span>📊</span>
                              <span>Biaya Variabel: {formatCurrency(item.variableCost)}</span>
                            </p>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-lg">
                            <p className="text-teal-600 font-semibold mb-1">BEP Target</p>
                            <p className="text-2xl font-bold text-teal-800">
                              {item.bepQuantity} buah
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!Array.isArray(bep) || !bep.length && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        🎯 Belum Ada Data BEP
                      </p>
                      <p className="text-gray-500">
                        Data produksi diperlukan untuk analisis BEP
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Chart Section */}
        <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold drop-shadow-sm">
                      📈 Grafik Penjualan
                    </CardTitle>
                    <p className="text-white/90 font-medium">Tren performa bisnis Anda</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Calendar className="w-4 h-4 mr-2" />
                    7 Hari
                  </Button>
                  <Button size="sm" className="bg-white text-purple-600 hover:bg-white/90">
                    <Eye className="w-4 h-4 mr-2" />
                    30 Hari
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    90 Hari
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-12 bg-gradient-to-br from-gray-50 to-white">
            <div className="relative h-80 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-violet-200 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 to-pink-100/30"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <PieChart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  📊 Visualisasi Data
                </h3>
                <p className="text-gray-600 mb-4 max-w-md">
                  Grafik interaktif penjualan akan ditampilkan di sini dengan Chart.js atau library serupa
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-violet-100 text-violet-800 font-semibold">
                    Chart.js Ready
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 font-semibold">
                    Interactive
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
