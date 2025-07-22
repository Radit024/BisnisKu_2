import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Save, 
  Package, 
  Factory, 
  ShoppingCart, 
  Calendar, 
  Hash, 
  FileText, 
  TrendingUp,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const stockSchema = z.object({
  itemName: z.string().min(1, 'Nama barang harus diisi'),
  type: z.enum(['raw_material', 'finished_product']),
  movementType: z.enum(['in', 'out']),
  quantity: z.string().min(1, 'Jumlah harus diisi'),
  reason: z.string().min(1, 'Alasan harus dipilih'),
  date: z.string().min(1, 'Tanggal harus diisi'),
  notes: z.string().optional(),
});

type StockFormData = z.infer<typeof stockSchema>;

export default function StockForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      itemName: '',
      type: 'raw_material',
      movementType: 'in',
      quantity: '',
      reason: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  const updateStock = useMutation({
    mutationFn: async (data: StockFormData) => {
      const response = await apiRequest('POST', '/api/stock/movement', {
        ...data,
        quantity: parseFloat(data.quantity),
        date: new Date(data.date).toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Stok berhasil diupdate',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/stock'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Gagal mengupdate stok',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: StockFormData) => {
    updateStock.mutate(data);
  };

  return (
    <Card className="group bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
      {/* Enhanced Header with Gradient */}
      <CardHeader className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold mb-2 drop-shadow-sm">
              ⚡ Update Stok Inventory
            </CardTitle>
            <p className="text-white/90 font-medium">
              Kelola pergerakan stok dengan mudah dan akurat
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </CardHeader>

      <CardContent className="p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Enhanced Item Name Field */}
          <div className="group">
            <Label htmlFor="itemName" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <Package className="w-5 h-5 text-indigo-600" />
              <span>📦 Nama Barang</span>
            </Label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
              <Input
                id="itemName"
                placeholder="Contoh: Tepung Terigu Premium"
                {...form.register('itemName')}
                className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg bg-white hover:bg-gray-50"
              />
            </div>
            {form.formState.errors.itemName && (
              <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                <span>⚠️</span>
                <span>{form.formState.errors.itemName.message}</span>
              </p>
            )}
          </div>

          {/* Enhanced Type Selection */}
          <div className="group">
            <Label htmlFor="type" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <Factory className="w-5 h-5 text-purple-600" />
              <span>🏭 Jenis Barang</span>
            </Label>
            <Select
              value={form.watch('type')}
              onValueChange={(value) => form.setValue('type', value as 'raw_material' | 'finished_product')}
            >
              <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-lg bg-white hover:bg-gray-50 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Factory className="w-4 h-4 text-purple-600" />
                  </div>
                  <SelectValue placeholder="Pilih jenis barang" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl rounded-xl backdrop-blur-none">
                <SelectItem value="raw_material" className="h-12 hover:bg-green-50 focus:bg-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Factory className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">🏭 Bahan Baku</span>
                  </div>
                </SelectItem>
                <SelectItem value="finished_product" className="h-12 hover:bg-blue-50 focus:bg-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">📦 Produk Jadi</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Movement Type and Quantity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <Label htmlFor="movementType" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>📈 Tipe Perubahan</span>
              </Label>
              <Select
                value={form.watch('movementType')}
                onValueChange={(value) => form.setValue('movementType', value as 'in' | 'out')}
              >
                <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl focus:border-green-500 text-lg bg-white hover:bg-gray-50 transition-all duration-300">
                  <SelectValue placeholder="Pilih tipe perubahan" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl rounded-xl backdrop-blur-none">
                  <SelectItem value="in" className="h-12 hover:bg-green-50 focus:bg-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">📈 Stok Masuk</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="out" className="h-12 hover:bg-red-50 focus:bg-red-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Minus className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">📉 Stok Keluar</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="group">
              <Label htmlFor="quantity" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
                <Hash className="w-5 h-5 text-blue-600" />
                <span>🔢 Jumlah</span>
              </Label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  {...form.register('quantity')}
                  className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-lg bg-white hover:bg-gray-50"
                />
              </div>
              {form.formState.errors.quantity && (
                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{form.formState.errors.quantity.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Reason Selection */}
          <div className="group">
            <Label htmlFor="reason" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <span>📝 Alasan Perubahan</span>
            </Label>
            <Select
              value={form.watch('reason')}
              onValueChange={(value) => form.setValue('reason', value)}
            >
              <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-lg bg-white hover:bg-gray-50 transition-all duration-300">
                <SelectValue placeholder="Pilih alasan perubahan" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl rounded-xl backdrop-blur-none">
                <SelectItem value="purchase" className="h-12 hover:bg-green-50 focus:bg-green-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🛒</span>
                    <span className="font-medium">Pembelian</span>
                  </div>
                </SelectItem>
                <SelectItem value="production" className="h-12 hover:bg-blue-50 focus:bg-blue-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏭</span>
                    <span className="font-medium">Produksi</span>
                  </div>
                </SelectItem>
                <SelectItem value="sale" className="h-12 hover:bg-purple-50 focus:bg-purple-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <span className="font-medium">Penjualan</span>
                  </div>
                </SelectItem>
                <SelectItem value="damaged" className="h-12 hover:bg-red-50 focus:bg-red-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💔</span>
                    <span className="font-medium">Rusak</span>
                  </div>
                </SelectItem>
                <SelectItem value="other" className="h-12 hover:bg-gray-50 focus:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📋</span>
                    <span className="font-medium">Lainnya</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Date Field */}
          <div className="group">
            <Label htmlFor="date" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>📅 Tanggal</span>
            </Label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="date"
                type="date"
                {...form.register('date')}
                className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-lg bg-white hover:bg-gray-50"
              />
            </div>
            {form.formState.errors.date && (
              <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                <span>⚠️</span>
                <span>{form.formState.errors.date.message}</span>
              </p>
            )}
          </div>

          {/* Enhanced Notes Field */}
          <div className="group">
            <Label htmlFor="notes" className="flex items-center space-x-2 text-lg font-semibold text-gray-700 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>📝 Catatan</span>
            </Label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-gray-600 transition-colors" />
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan atau keterangan tambahan..."
                {...form.register('notes')}
                className="pl-12 pt-4 border-2 border-gray-200 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-300 text-lg bg-white hover:bg-gray-50 min-h-[120px] resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              className="relative w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              disabled={updateStock.isPending}
            >
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <div className="bg-white/20 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Save className="w-6 h-6" />
                </div>
                <span className="drop-shadow-sm">
                  {updateStock.isPending ? '⏳ Menyimpan Data...' : '🚀 Update Stok Sekarang'}
                </span>
              </div>
              
              {/* Loading Animation */}
              {updateStock.isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50 rounded-2xl flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
