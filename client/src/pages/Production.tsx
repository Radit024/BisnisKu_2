import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Calendar, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  Users,
  Settings,
  Target,
  Activity,
  Zap,
  Eye,
  Filter,
  Download
} from 'lucide-react';
import ProductionForm from '@/components/ProductionForm';

export default function Production() {
  const { data: productions, isLoading } = useQuery({
    queryKey: ['/api/productions'],
  });

  // Mock data untuk statistik produksi
  const productionStats = {
    todayProduction: 45,
    totalProducts: 12,
    efficiency: 92,
    activeWorkers: 8
  };

  return (
    <div className="space-y-8">
      {/* Hero Header - Production Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-8 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Section */}
            <div className="lg:col-span-8">
              <div className="flex items-start space-x-6">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                  <Factory className="w-12 h-12 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-bold">Produksi Hari Ini</h1>
                    <span className="text-3xl">🏭</span>
                  </div>
                  <p className="text-orange-100 text-xl mb-4">
                    Pantau dan kelola proses produksi dengan efisien
                  </p>
                  
                  {/* Status Indicators */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-200 text-sm font-medium">Mesin Aktif</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-orange-200" />
                      <span className="text-orange-200 text-sm">Efisiensi {productionStats.efficiency}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-pink-200" />
                      <span className="text-pink-200 text-sm">{productionStats.activeWorkers} Pekerja Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Catat Produksi Baru
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                  <Package className="w-4 h-4 mr-2" />
                  Kelola Bahan
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Laporan Produksi
                </Button>
              </div>
            </div>
            
            {/* Stats Dashboard */}
            <div className="lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-lg">Statistik Produksi</h3>
                  <Settings className="w-5 h-5 text-orange-200" />
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
                    <p className="text-orange-200 text-sm">Shift Pagi - Aktif</p>
                  </div>
                  
                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Factory className="w-5 h-5 text-orange-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">{productionStats.todayProduction}</p>
                      <p className="text-orange-200 text-xs">Unit Hari Ini</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Package className="w-5 h-5 text-red-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">{productionStats.totalProducts}</p>
                      <p className="text-red-200 text-xs">Jenis Produk</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Target className="w-5 h-5 text-pink-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">{productionStats.efficiency}%</p>
                      <p className="text-pink-200 text-xs">Efisiensi</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <Users className="w-5 h-5 text-yellow-200 mx-auto mb-1" />
                      <p className="text-white font-bold text-lg">{productionStats.activeWorkers}</p>
                      <p className="text-yellow-200 text-xs">Pekerja</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-200">Target Harian</span>
                      <span className="text-white font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm font-medium">Status Produksi</span>
                      </div>
                      <span className="text-green-300 text-sm font-bold">Optimal</span>
                    </div>
                    <p className="text-orange-200 text-xs mt-1">Semua mesin beroperasi normal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Produksi Hari Ini</p>
                <p className="text-3xl font-bold text-orange-900">{productionStats.todayProduction}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+18% dari kemarin</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Factory className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Efisiensi Produksi</p>
                <p className="text-3xl font-bold text-blue-900">{productionStats.efficiency}%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600 font-medium">Target tercapai</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Jenis Produk</p>
                <p className="text-3xl font-bold text-green-900">{productionStats.totalProducts}</p>
                <div className="flex items-center mt-2">
                  <Package className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Produk aktif</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Pekerja Aktif</p>
                <p className="text-3xl font-bold text-purple-900">{productionStats.activeWorkers}</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-sm text-purple-600 font-medium">Shift pagi</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production Form - Enhanced */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Plus className="w-5 h-5 text-orange-600 mr-2" />
              Catat Produksi Baru
            </h3>
          </div>
          <ProductionForm />
        </div>

        {/* Production History - Enhanced */}
        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-orange-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <div className="bg-orange-100 p-2 rounded-xl mr-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <span className="block">Riwayat Produksi</span>
                  <span className="text-sm font-normal text-gray-500">Catatan produksi terbaru</span>
                </div>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-200">
                  <Download className="w-4 h-4 mr-2" />
                  Ekspor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {Array.isArray(productions) && productions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {productions.map((production: any, index: number) => (
                      <div 
                        key={production.id || index} 
                        className="p-6 hover:bg-gray-50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="bg-orange-100 p-3 rounded-xl">
                              <Factory className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {production.productName}
                              </h4>
                              <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(production.date).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span className="px-2 py-1 bg-orange-100 rounded-full text-xs font-medium text-orange-800">
                                  Produksi Selesai
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              {production.quantity} Unit
                            </Badge>
                          </div>
                        </div>
                        
                        {production.materials && production.materials.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                              <Package className="w-4 h-4 mr-2 text-gray-600" />
                              Bahan yang Digunakan:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {production.materials.map((material: any, materialIndex: number) => (
                                <div key={materialIndex} className="flex items-center justify-between py-1">
                                  <span className="text-sm text-gray-700">{material.materialName}</span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {material.quantity} {material.unit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Factory className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada catatan produksi</h3>
                    <p className="text-gray-500 mb-6">
                      Mulai catat produksi pertama Anda untuk melacak proses pembuatan produk
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Catat Produksi Pertama
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
