import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown, 
  Plus,
  Boxes,
  Eye,
  Edit
} from 'lucide-react';
import StockForm from '@/components/StockForm';

export default function Stock() {
  const { data: stockItems = [], isLoading } = useQuery({
    queryKey: ['/api/stock'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
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
    <div className="space-y-6">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Boxes className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-semibold">Manajemen Stok</h1>
              <p className="text-blue-100">Pantau dan kelola inventori bisnis</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">{stockStats.total} Items</p>
            <p className="text-blue-200 text-sm">{stockStats.lowStock} Stok Rendah</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stok Rendah</p>
                <p className="text-xl font-semibold text-gray-900">{stockStats.lowStock}</p>
                <p className="text-sm text-red-600">Items perlu restock</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stok Sedang</p>
                <p className="text-xl font-semibold text-gray-900">{stockStats.mediumStock}</p>
                <p className="text-sm text-yellow-600">Perlu dimonitor</p>
              </div>
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stok Aman</p>
                <p className="text-xl font-semibold text-gray-900">{stockStats.safeStock}</p>
                <p className="text-sm text-green-600">Kondisi optimal</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Item</p>
                <p className="text-xl font-semibold text-gray-900">{stockStats.total}</p>
                <p className="text-sm text-blue-600">Items terdaftar</p>
              </div>
              <Boxes className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Form */}
        <StockForm />

        {/* Stock List */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Boxes className="w-5 h-5 text-gray-600 mr-2" />
                Daftar Stok Inventory
              </CardTitle>
              <Badge variant="secondary">{stockStats.total} Items</Badge>
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
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Produk</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tipe</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Stok Saat Ini</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(stockItems) && stockItems.map((item: any) => {
                      const status = getStockStatus(parseFloat(item.currentStock));
                      const StatusIcon = status.icon;
                      return (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Boxes className="w-4 h-4 text-blue-600" />
                              <div>
                                <p className="font-medium text-gray-900">{item.itemName}</p>
                                <p className="text-sm text-gray-500">ID: {item.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">
                              {item.type === 'raw_material' ? 'Bahan Baku' : 'Produk Jadi'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${status.color}`}>
                              {item.currentStock} {item.unit}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={status.variant} className="flex items-center space-x-1 w-fit">
                              <StatusIcon className="w-3 h-3" />
                              <span>{status.label}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
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
                    <td colSpan={5} className="py-12 px-4 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <Boxes className="w-12 h-12 text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-700 mb-1">Belum Ada Data Stok</p>
                          <p className="text-gray-500 mb-4">
                            Mulai kelola inventori Anda dengan menambahkan item stok pertama
                          </p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
