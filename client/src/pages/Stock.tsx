import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StockForm from '@/components/StockForm';

export default function Stock() {
  const { data: stockItems, isLoading } = useQuery({
    queryKey: ['/api/stock'],
  });

  const getStockStatus = (stock: number) => {
    if (stock < 10) return { label: 'Stok Rendah', variant: 'destructive' as const };
    if (stock < 50) return { label: 'Stok Sedang', variant: 'secondary' as const };
    return { label: 'Stok Aman', variant: 'default' as const };
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Stok</h2>
        <p className="text-gray-600">Pantau dan kelola stok bahan baku dan produk jadi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock Form */}
        <StockForm />

        {/* Stock List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Stok Saat Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {stockItems?.map((item: any) => {
                  const status = getStockStatus(parseFloat(item.currentStock));
                  return (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-text-main">
                            {item.itemName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.type === 'raw_material' ? 'Bahan Baku' : 'Produk Jadi'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            parseFloat(item.currentStock) < 10 ? 'text-red-600' : 
                            parseFloat(item.currentStock) < 50 ? 'text-accent' : 'text-success'
                          }`}>
                            {item.currentStock} {item.unit}
                          </p>
                          <Badge variant={status.variant} className="text-xs">
                            {status.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!stockItems?.length && (
                  <p className="text-gray-500 text-center py-8">
                    Belum ada data stok. Mulai kelola stok barang Anda!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
