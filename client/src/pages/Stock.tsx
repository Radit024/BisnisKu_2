import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown, 
  BarChart3, 
  Search,
  Filter,
  Download,
  Plus,
  Boxes,
  Factory,
  ShoppingCart,
  Eye,
  Edit,
  RefreshCw
} from 'lucide-react';
import StockForm from '@/components/StockForm';

export default function Stock() {
  const { data: stockItems, isLoading } = useQuery({
    queryKey: ['/api/stock'],
  });

  // Calculate stock statistics
  const stockStats = Array.isArray(stockItems) ? {
    total: stockItems.length,
    lowStock: stockItems.filter((item: any) => parseFloat(item.currentStock) < 10).length,
    mediumStock: stockItems.filter((item: any) => parseFloat(item.currentStock) >= 10 && parseFloat(item.currentStock) < 50).length,
    safeStock: stockItems.filter((item: any) => parseFloat(item.currentStock) >= 50).length,
    rawMaterials: stockItems.filter((item: any) => item.type === 'raw_material').length,
    finishedProducts: stockItems.filter((item: any) => item.type === 'finished_product').length,
  } : {
    total: 0,
    lowStock: 0,
    mediumStock: 0,
    safeStock: 0,
    rawMaterials: 0,
    finishedProducts: 0,
  };

  const getStockStatus = (stock: number) => {
    if (stock < 10) return { label: 'Stok Rendah', variant: 'destructive' as const, icon: AlertTriangle, color: 'text-red-600' };
    if (stock < 50) return { label: 'Stok Sedang', variant: 'secondary' as const, icon: TrendingDown, color: 'text-yellow-600' };
    return { label: 'Stok Aman', variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' };
  };

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600"></div>
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
                    <Boxes className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      📦 Manajemen Stok
                    </h1>
                    <p className="text-xl text-orange-100">
                      Pantau dan kelola inventori bisnis dengan sistem yang cerdas
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">📊 Real-time Tracking</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">⚠️ Alert System</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white font-semibold">📈 Analytics</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-2xl font-bold">{stockStats.total}</p>
                    <p className="text-orange-200 text-xs">Total Items</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-2xl font-bold">{stockStats.lowStock}</p>
                    <p className="text-orange-200 text-xs">Low Stock</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-2xl font-bold">{stockStats.rawMaterials}</p>
                    <p className="text-orange-200 text-xs">Raw Materials</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-2xl font-bold">{stockStats.finishedProducts}</p>
                    <p className="text-orange-200 text-xs">Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-8 relative z-10">
        <Card className="group bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-red-100 text-red-800 text-xs font-semibold">
                  Urgent
                </Badge>
              </div>
              <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Stok Rendah</p>
              <p className="text-3xl font-bold text-red-900 mb-2">{stockStats.lowStock}</p>
              <p className="text-sm text-red-600">Items perlu restock</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-3 rounded-xl shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs font-semibold">
                  Watch
                </Badge>
              </div>
              <p className="text-sm font-semibold text-yellow-700 mb-2">⚡ Stok Sedang</p>
              <p className="text-3xl font-bold text-yellow-900 mb-2">{stockStats.mediumStock}</p>
              <p className="text-sm text-yellow-600">Perlu dimonitor</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs font-semibold">
                  Safe
                </Badge>
              </div>
              <p className="text-sm font-semibold text-green-700 mb-2">✅ Stok Aman</p>
              <p className="text-3xl font-bold text-green-900 mb-2">{stockStats.safeStock}</p>
              <p className="text-sm text-green-600">Kondisi optimal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-xs font-semibold">
                  Total
                </Badge>
              </div>
              <p className="text-sm font-semibold text-blue-700 mb-2">📦 Total Item</p>
              <p className="text-3xl font-bold text-blue-900 mb-2">{stockStats.total}</p>
              <p className="text-sm text-blue-600">Items terdaftar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
        {/* Enhanced Action Buttons */}
        <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="space-y-0 pb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  🚀 Tambah Stok Baru
                </CardTitle>
                <p className="text-gray-600 mt-2">Kelola inventori dengan mudah dan efisien</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Factory className="w-5 h-5 mr-2" />
                Bahan Baku
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Produk Jadi
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 py-4 rounded-xl transition-all duration-300 group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Export Data Stok
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Search & Filter */}
        <Card className="group bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="space-y-0 pb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  🔍 Cari & Filter
                </CardTitle>
                <p className="text-gray-600 mt-2">Temukan item stok dengan cepat dan akurat</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama produk..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 hover:text-green-800 py-3 rounded-xl transition-all duration-300 group"
              >
                <Filter className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-700 hover:text-blue-800 py-3 rounded-xl transition-all duration-300 group"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Stock Form */}
        <StockForm />

        {/* Enhanced Stock List */}
        <Card className="bg-white border-0 shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    📋 Daftar Stok Inventory
                  </CardTitle>
                  <p className="text-gray-600 mt-1">Kelola dan pantau semua item stok Anda</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-semibold px-4 py-2">
                {stockStats.total} Items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-slate-100 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        <div className="flex items-center space-x-2">
                          <Boxes className="w-4 h-4 text-gray-500" />
                          <span>Produk</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        <div className="flex items-center space-x-2">
                          <Factory className="w-4 h-4 text-gray-500" />
                          <span>Tipe</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-gray-500" />
                          <span>Stok Saat Ini</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-gray-500" />
                          <span>Status</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(stockItems) && stockItems.map((item: any) => {
                      const status = getStockStatus(parseFloat(item.currentStock));
                      const StatusIcon = status.icon;
                      return (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <Boxes className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{item.itemName}</p>
                                <p className="text-sm text-gray-500">ID: {item.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <Badge 
                              className={`${
                                item.type === 'raw_material' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-purple-100 text-purple-800 border-purple-200'
                              } font-medium`}
                            >
                              {item.type === 'raw_material' ? '🏭 Bahan Baku' : '📦 Produk Jadi'}
                            </Badge>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xl font-bold ${status.color}`}>
                                {item.currentStock}
                              </span>
                              <span className="text-sm text-gray-500 font-medium">{item.unit}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <Badge 
                              variant={status.variant} 
                              className="flex items-center space-x-1 w-fit font-medium"
                            >
                              <StatusIcon className="w-3 h-3" />
                              <span>{status.label}</span>
                            </Badge>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-all duration-200"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 transition-all duration-200"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!Array.isArray(stockItems) || !stockItems.length && (
                  <tr>
                    <td colSpan={5} className="py-16 px-6 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <Boxes className="w-10 h-10 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-gray-700 mb-2">
                            📦 Belum Ada Data Stok
                          </p>
                          <p className="text-gray-500 mb-4">
                            Mulai kelola inventori Anda dengan menambahkan item stok pertama
                          </p>
                          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Stok Pertama
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
