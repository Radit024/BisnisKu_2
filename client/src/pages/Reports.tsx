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
  Calendar, 
  Activity,
  Calculator,
  Star
} from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useState } from 'react';

export default function Reports() {
  const [activeRecap, setActiveRecap] = useState('harian');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  
  const { data: financialSummary = {}, isLoading: loadingFinancial } = useQuery({
    queryKey: ['/api/reports/financial'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
  });

  const { data: topProducts = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['/api/reports/top-products'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
  });

  const { data: hpp = [], isLoading: loadingHpp } = useQuery({
    queryKey: ['/api/reports/hpp'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
  });

  const { data: bep = [], isLoading: loadingBep } = useQuery({
    queryKey: ['/api/reports/bep'],
    gcTime: 0, // Garbage collection time = 0 (data langsung dihapus)
    staleTime: 0, // Data selalu dianggap stale
  });

  // Mock data untuk rekapan
  const recapData = {
    harian: {
      title: 'Rekapan Harian',
      subtitle: 'Data penjualan hari ini - 24 Juli 2025',
      timestamp: 'Update terakhir: 14:30 WIB',
      data: [
        { label: 'Penjualan Hari Ini', value: 3500000, trend: '+12%', color: 'green' },
        { label: 'Transaksi Completed', value: 45, trend: '+8%', color: 'blue' },
        { label: 'Produk Terjual', value: 123, trend: '+15%', color: 'purple' },
        { label: 'Customer Baru', value: 12, trend: '+25%', color: 'orange' }
      ]
    },
    mingguan: {
      title: 'Rekapan Mingguan',
      subtitle: 'Data penjualan 18 - 24 Juli 2025 (Minggu ke-30)',
      timestamp: 'Periode: 7 hari terakhir',
      data: [
        { label: 'Penjualan Minggu Ini', value: 24500000, trend: '+18%', color: 'green' },
        { label: 'Rata-rata Harian', value: 3500000, trend: '+5%', color: 'blue' },
        { label: 'Total Transaksi', value: 315, trend: '+22%', color: 'purple' },
        { label: 'Customer Active', value: 89, trend: '+12%', color: 'orange' }
      ]
    },
    bulanan: {
      title: 'Rekapan Bulanan',
      subtitle: 'Data penjualan Juli 2025 (Bulan ke-7)',
      timestamp: 'Periode: 1 - 24 Juli 2025 (24 hari)',
      data: [
        { label: 'Penjualan Bulan Ini', value: 105000000, trend: '+28%', color: 'green' },
        { label: 'Target Achievement', value: 85, trend: '+15%', color: 'blue', isPercentage: true },
        { label: 'Total Order', value: 1234, trend: '+35%', color: 'purple' },
        { label: 'Customer Retention', value: 78, trend: '+8%', color: 'orange', isPercentage: true }
      ]
    },
    tahunan: {
      title: 'Rekapan Tahunan',
      subtitle: 'Data penjualan Tahun 2025 (Jan - Jul)',
      timestamp: 'Periode: 1 Januari - 24 Juli 2025 (205 hari)',
      data: [
        { label: 'Penjualan Tahun Ini', value: 980000000, trend: '+42%', color: 'green' },
        { label: 'Growth Rate', value: 42, trend: '+12%', color: 'blue', isPercentage: true },
        { label: 'Total Customer', value: 2567, trend: '+65%', color: 'purple' },
        { label: 'Market Share', value: 12, trend: '+3%', color: 'orange', isPercentage: true }
      ]
    }
  };

  // Data untuk trend chart dengan detail
  const trendData = {
    harian: {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      values: [2100000, 890000, 1200000, 3400000, 5200000, 4100000, 3800000, 2900000],
      heights: [40, 25, 35, 85, 100, 80, 75, 60]
    },
    mingguan: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      values: [3200000, 4100000, 2800000, 4800000, 3900000, 5200000, 3500000],
      heights: [60, 78, 45, 89, 67, 92, 58]
    },
    bulanan: {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      values: [24500000, 28200000, 31800000, 26900000],
      heights: [65, 75, 85, 72]
    },
    tahunan: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      values: [85000000, 92000000, 78000000, 105000000, 88000000, 112000000, 95000000, 98000000, 102000000, 89000000, 115000000, 88000000],
      heights: [65, 78, 45, 89, 67, 92, 58, 76, 83, 71, 94, 68]
    }
  };

  const currentTrendData = trendData[activeRecap as keyof typeof trendData];

  return (
    <div className="space-y-4">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-5 h-5" />
            <div>
              <h1 className="text-lg font-semibold">Dashboard Laporan</h1>
              <p className="text-blue-100 text-sm">Analisis keuangan dan performa bisnis</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-blue-200 text-xs">Pemasukan</p>
              <p className="text-white font-semibold text-sm">
                {formatCurrency((financialSummary as any)?.totalIncome || 0)}
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Pengeluaran</p>
              <p className="text-white font-semibold text-sm">
                {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Profit</p>
              <p className="text-white font-semibold text-sm">
                {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Rekapan Section */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <div>
                  <CardTitle className="text-base font-semibold">Rekapan Penjualan</CardTitle>
                  <p className="text-blue-100 text-xs">Ringkasan performa berdasarkan periode</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {['harian', 'mingguan', 'bulanan', 'tahunan'].map((period) => (
                  <Button
                    key={period}
                    variant={activeRecap === period ? "secondary" : "outline"}
                    size="sm"
                    className={`text-xs px-2 py-1 ${
                      activeRecap === period 
                        ? "bg-white text-blue-600 hover:bg-white/90" 
                        : "border-white/30 text-white hover:bg-white/20"
                    }`}
                    onClick={() => setActiveRecap(period)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {recapData[activeRecap as keyof typeof recapData].title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {recapData[activeRecap as keyof typeof recapData].subtitle}
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 text-gray-500 mr-1" />
                  <p className="text-xs text-gray-500">
                    {recapData[activeRecap as keyof typeof recapData].timestamp}
                  </p>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center">
                  <Activity className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">Live Data</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {recapData[activeRecap as keyof typeof recapData].data.map((item, index) => (
                <div key={index} className={`bg-${item.color}-50 rounded-lg p-4 border border-${item.color}-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-${item.color}-700 font-medium text-xs`}>{item.label}</p>
                    <Badge className={`bg-${item.color}-100 text-${item.color}-800 text-xs`}>
                      {item.trend}
                    </Badge>
                  </div>
                  <p className={`text-2xl font-bold text-${item.color}-800`}>
                    {(item as any).isPercentage 
                      ? `${item.value}%` 
                      : (typeof item.value === 'number' && item.value > 1000000)
                        ? formatCurrency(item.value)
                        : item.value.toLocaleString()
                    }
                  </p>
                  <div className="mt-2 flex items-center">
                    <TrendingUp className={`w-3 h-3 text-${item.color}-600 mr-1`} />
                    <span className={`text-xs text-${item.color}-600`}>
                      vs periode sebelumnya
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mini Chart untuk Trend */}
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border relative">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Trend {recapData[activeRecap as keyof typeof recapData].title}
              </h4>
              <div className="relative">
                <div className="flex items-end space-x-2 h-16">
                  {currentTrendData.heights.map((height, index) => (
                    <div 
                      key={index}
                      className="bg-blue-400 rounded-t flex-1 opacity-80 transition-all hover:opacity-100 cursor-pointer relative"
                      style={{ height: `${height}%` }}
                      onMouseEnter={(e) => {
                        setHoveredBar(index);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltipPosition({
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10
                        });
                      }}
                      onMouseLeave={() => {
                        setHoveredBar(null);
                        setTooltipPosition(null);
                      }}
                      onClick={(e) => {
                        // Toggle tooltip on click for mobile
                        if (hoveredBar === index) {
                          setHoveredBar(null);
                          setTooltipPosition(null);
                        } else {
                          setHoveredBar(index);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPosition({
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Tooltip */}
                {hoveredBar !== null && tooltipPosition && (
                  <div 
                    className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
                    style={{
                      left: tooltipPosition.x,
                      top: tooltipPosition.y
                    }}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-blue-200">
                        {currentTrendData.labels[hoveredBar]}
                      </p>
                      <p className="text-white">
                        {formatCurrency(currentTrendData.values[hoveredBar])}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {((currentTrendData.values[hoveredBar] / Math.max(...currentTrendData.values)) * 100).toFixed(1)}% dari maksimal
                      </p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                {currentTrendData.labels.map((label, index) => (
                  <span 
                    key={index}
                    className={`transition-colors ${hoveredBar === index ? 'text-blue-600 font-semibold' : ''}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              
              {/* Summary Info */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Total</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCurrency(currentTrendData.values.reduce((a, b) => a + b, 0))}
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Rata-rata</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCurrency(Math.round(currentTrendData.values.reduce((a, b) => a + b, 0) / currentTrendData.values.length))}
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Tertinggi</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCurrency(Math.max(...currentTrendData.values))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Financial Summary Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <div>
                  <CardTitle className="text-base font-semibold">Ringkasan Keuangan</CardTitle>
                  <p className="text-blue-100 text-xs">Overview finansial bisnis</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {loadingFinancial ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-3 bg-gray-100 rounded-lg">
                      <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-700 font-medium mb-1 text-sm">Total Pemasukan</p>
                        <p className="text-lg font-bold text-green-800">
                          {formatCurrency((financialSummary as any)?.totalIncome || 0)}
                        </p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-700 font-medium mb-1 text-sm">Total Pengeluaran</p>
                        <p className="text-lg font-bold text-red-800">
                          {formatCurrency((financialSummary as any)?.totalExpenses || 0)}
                        </p>
                      </div>
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-700 font-medium mb-1 text-sm">Keuntungan Bersih</p>
                        <p className="text-lg font-bold text-blue-800">
                          {formatCurrency(((financialSummary as any)?.totalIncome || 0) - ((financialSummary as any)?.totalExpenses || 0))}
                        </p>
                      </div>
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Products Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <div>
                  <CardTitle className="text-base font-semibold">Produk Terlaris</CardTitle>
                  <p className="text-blue-100 text-xs">Top performer produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {loadingProducts ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-3 bg-gray-100 rounded-lg">
                      <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {Array.isArray(topProducts) && topProducts.length > 0 ? topProducts.map((product: any, index: number) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-purple-600 text-white w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{product.productName}</p>
                            <p className="text-purple-600 text-xs">{product.quantitySold} terjual</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Revenue</p>
                          <p className="text-sm font-bold text-green-600">
                            {formatCurrency(product.totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-6">
                      <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Belum Ada Data Penjualan
                      </p>
                      <p className="text-gray-500 text-xs">
                        Mulai jual produk untuk melihat analisis terlaris
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* HPP and BEP Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* HPP Analysis Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <div>
                  <CardTitle className="text-base font-semibold">Analisis HPP</CardTitle>
                  <p className="text-blue-100 text-xs">Harga Pokok Penjualan per produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {loadingHpp ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-3 bg-gray-100 rounded-lg">
                      <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {Array.isArray(hpp) && hpp.length > 0 ? hpp.map((item: any, index: number) => (
                    <div key={index} className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.productName}</h4>
                        <Badge className="bg-orange-100 text-orange-800 text-xs">HPP</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg p-2 border">
                          <p className="text-orange-700 font-medium text-xs mb-1">Biaya Produksi</p>
                          <p className="text-sm font-bold text-orange-800">
                            {formatCurrency(item.productionCost)}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-2 border">
                          <p className="text-orange-700 font-medium text-xs mb-1">HPP per Unit</p>
                          <p className="text-sm font-bold text-orange-800">
                            {formatCurrency(item.hppPerUnit)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-orange-100 rounded-lg p-2">
                        <p className="text-orange-700 font-medium text-xs mb-1">Harga Jual Minimal (30% margin)</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 text-xs">Rekomendasi:</span>
                          <span className="text-sm font-bold text-green-600">
                            {formatCurrency(item.hpp * 1.3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-6">
                      <Calculator className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">Belum Ada Data HPP</p>
                      <p className="text-gray-500 text-xs">Mulai input biaya produksi untuk analisis HPP</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* BEP Analysis Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <div>
                  <CardTitle className="text-base font-semibold">Analisis BEP</CardTitle>
                  <p className="text-blue-100 text-xs">Break Even Point per produk</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {loadingBep ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-3 bg-gray-100 rounded-lg">
                      <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {Array.isArray(bep) && bep.length > 0 ? bep.map((item: any, index: number) => (
                    <div key={index} className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.productName}</h4>
                        <Badge className="bg-cyan-100 text-cyan-800 text-xs">BEP</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg p-2 border">
                          <p className="text-cyan-700 font-medium text-xs mb-1">Fixed Cost</p>
                          <p className="text-sm font-bold text-cyan-800">
                            {formatCurrency(item.fixedCost)}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-2 border">
                          <p className="text-cyan-700 font-medium text-xs mb-1">Variable Cost/Unit</p>
                          <p className="text-sm font-bold text-cyan-800">
                            {formatCurrency(item.variableCost)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-cyan-100 rounded-lg p-2">
                        <p className="text-cyan-700 font-medium text-xs mb-1">Break Even Point</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 text-xs">Unit yang harus dijual:</span>
                            <span className="text-sm font-bold text-blue-600">
                              {item.bepUnit} unit
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 text-xs">Revenue yang dibutuhkan:</span>
                            <span className="text-sm font-bold text-green-600">
                              {formatCurrency(item.bepRevenue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-6">
                      <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700 mb-1">Belum Ada Data BEP</p>
                      <p className="text-gray-500 text-xs">Input fixed cost dan variable cost untuk analisis BEP</p>
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
