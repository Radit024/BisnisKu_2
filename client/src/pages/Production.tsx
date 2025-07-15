import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductionForm from '@/components/ProductionForm';

export default function Production() {
  const { data: productions, isLoading } = useQuery({
    queryKey: ['/api/productions'],
  });

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Produksi</h2>
        <p className="text-gray-600">Catat proses pembuatan produk dan bahan yang digunakan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production Form */}
        <ProductionForm />

        {/* Production History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Riwayat Produksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {productions?.map((production: any) => (
                  <div key={production.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-main">
                        {production.productName}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {new Date(production.date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Jumlah: {production.quantity} buah
                    </p>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Bahan:</p>
                      <ul className="ml-4 list-disc">
                        {production.materials?.map((material: any, index: number) => (
                          <li key={index}>
                            {material.materialName}: {material.quantity} {material.unit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                {!productions?.length && (
                  <p className="text-gray-500 text-center py-8">
                    Belum ada catatan produksi. Mulai catat produksi pertama Anda!
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
