import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Calendar, 
  Package, 
  Clock, 
  Plus,
  Users,
  Target,
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Factory className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-semibold">Produksi Hari Ini</h1>
              <p className="text-blue-100">Pantau dan kelola proses produksi</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold text-lg">{productionStats.todayProduction} Unit</p>
            <p className="text-blue-200 text-sm">Efisiensi {productionStats.efficiency}%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produksi Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">{productionStats.todayProduction}</p>
                <p className="text-sm text-green-600">+18% dari kemarin</p>
              </div>
              <Factory className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efisiensi Produksi</p>
                <p className="text-2xl font-bold text-gray-900">{productionStats.efficiency}%</p>
                <p className="text-sm text-blue-600">Target tercapai</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Jenis Produk</p>
                <p className="text-2xl font-bold text-gray-900">{productionStats.totalProducts}</p>
                <p className="text-sm text-green-600">Produk aktif</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pekerja Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{productionStats.activeWorkers}</p>
                <p className="text-sm text-purple-600">Shift pagi</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production Form - Enhanced */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Catat Produksi Baru</h3>
          <ProductionForm />
        </div>

        {/* Production History - Enhanced */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 text-gray-600 mr-2" />
                Riwayat Produksi
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
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
                  <div className="divide-y">
                    {productions.map((production: any, index: number) => (
                      <div key={production.id || index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Factory className="w-5 h-5 text-orange-600" />
                            <div>
                              <h4 className="font-medium text-gray-900">{production.productName}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {new Date(production.date).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary">{production.quantity} Unit</Badge>
                        </div>
                        
                        {production.materials && production.materials.length > 0 && (
                          <div className="bg-gray-50 rounded-md p-3 mt-3">
                            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                              <Package className="w-4 h-4 mr-1 text-gray-600" />
                              Bahan yang Digunakan:
                            </h5>
                            <div className="space-y-1">
                              {production.materials.map((material: any, materialIndex: number) => (
                                <div key={materialIndex} className="flex justify-between text-sm">
                                  <span className="text-gray-700">{material.materialName}</span>
                                  <span className="font-medium">{material.quantity} {material.unit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Factory className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada catatan produksi</h3>
                    <p className="text-gray-500 mb-4">
                      Mulai catat produksi pertama Anda untuk melacak proses pembuatan produk
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
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
