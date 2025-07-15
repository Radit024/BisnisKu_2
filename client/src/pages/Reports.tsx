import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Laporan</h2>
        <p className="text-gray-600">Analisis keuangan dan performa bisnis Anda</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Ringkasan Keuangan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFinancial ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse p-3 bg-gray-50 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Pemasukan</p>
                    <p className="text-xl font-bold text-success">
                      {formatCurrency(financialSummary?.totalIncome || 0)}
                    </p>
                  </div>
                  <div className="bg-success/20 p-3 rounded-full">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Pengeluaran</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(financialSummary?.totalExpenses || 0)}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Keuntungan Bersih</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency((financialSummary?.totalIncome || 0) - (financialSummary?.totalExpenses || 0))}
                    </p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-full">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              Produk Terlaris
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse p-3 border border-gray-200 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topProducts?.map((product: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-text-main">{product.productName}</p>
                      <p className="text-sm text-gray-600">{product.quantitySold} terjual</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">
                        {formatCurrency(product.totalRevenue)}
                      </p>
                    </div>
                  </div>
                ))}
                {!topProducts?.length && (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada data penjualan produk
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* HPP & BEP Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              HPP (Harga Pokok Penjualan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingHpp ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {hpp?.map((item: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-main">{item.productName}</h4>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Total Biaya Bahan: {formatCurrency(item.totalMaterialCost)}</p>
                      <p>Total Produksi: {item.totalProduction} buah</p>
                      <p className="font-medium text-text-main">
                        HPP per unit: {formatCurrency(item.hppPerUnit)}
                      </p>
                    </div>
                  </div>
                ))}
                {!hpp?.length && (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada data HPP
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-main">
              BEP (Break Even Point)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingBep ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {bep?.map((item: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-main">{item.productName}</h4>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Biaya Tetap: {formatCurrency(item.fixedCost)}</p>
                      <p>Harga Jual: {formatCurrency(item.sellingPrice)}</p>
                      <p>Biaya Variabel: {formatCurrency(item.variableCost)}</p>
                      <p className="font-medium text-accent">
                        BEP: {item.bepQuantity} buah
                      </p>
                    </div>
                  </div>
                ))}
                {!bep?.length && (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada data BEP
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-text-main">
              Grafik Penjualan
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">7 Hari</Button>
              <Button size="sm" className="bg-primary">30 Hari</Button>
              <Button variant="outline" size="sm">90 Hari</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Grafik penjualan akan ditampilkan di sini</p>
              <p className="text-sm text-gray-500">Menggunakan Chart.js atau library serupa</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
