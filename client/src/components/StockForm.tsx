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
  Plus,
  Minus
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
    <Card className="border shadow-sm">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Package className="w-5 h-5 mr-2" />
          <div>
            <span className="block">Update Stok Inventory</span>
            <span className="text-sm font-normal text-blue-100">Kelola pergerakan stok dengan mudah</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Item Name Field */}
          <div>
            <Label htmlFor="itemName" className="text-sm font-medium text-gray-700">
              Nama Barang
            </Label>
            <Input
              id="itemName"
              placeholder="Contoh: Tepung Terigu Premium"
              {...form.register('itemName')}
              className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {form.formState.errors.itemName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.itemName.message}
              </p>
            )}
          </div>

          {/* Type Selection */}
          <div>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
              Jenis Barang
            </Label>
            <Select
              value={form.watch('type')}
              onValueChange={(value) => form.setValue('type', value as 'raw_material' | 'finished_product')}
            >
              <SelectTrigger className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <SelectValue placeholder="Pilih jenis barang" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg">
                <SelectItem value="raw_material" className="bg-white hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Factory className="w-4 h-4 text-green-600" />
                    <span>Bahan Baku</span>
                  </div>
                </SelectItem>
                <SelectItem value="finished_product" className="bg-white hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    <span>Produk Jadi</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Movement Type and Quantity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="movementType" className="text-sm font-medium text-gray-700">
                Tipe Perubahan
              </Label>
              <Select
                value={form.watch('movementType')}
                onValueChange={(value) => form.setValue('movementType', value as 'in' | 'out')}
              >
                <SelectTrigger className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Pilih tipe perubahan" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  <SelectItem value="in" className="bg-white hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-green-600" />
                      <span>Stok Masuk</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="out" className="bg-white hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Minus className="w-4 h-4 text-red-600" />
                      <span>Stok Keluar</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Jumlah
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                {...form.register('quantity')}
                className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {form.formState.errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
              Alasan Perubahan
            </Label>
            <Select
              value={form.watch('reason')}
              onValueChange={(value) => form.setValue('reason', value)}
            >
              <SelectTrigger className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <SelectValue placeholder="Pilih alasan perubahan" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg">
                <SelectItem value="purchase" className="bg-white hover:bg-gray-50">Pembelian</SelectItem>
                <SelectItem value="production" className="bg-white hover:bg-gray-50">Produksi</SelectItem>
                <SelectItem value="sale" className="bg-white hover:bg-gray-50">Penjualan</SelectItem>
                <SelectItem value="damaged" className="bg-white hover:bg-gray-50">Rusak</SelectItem>
                <SelectItem value="other" className="bg-white hover:bg-gray-50">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Field */}
          <div>
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Tanggal
            </Label>
            <Input
              id="date"
              type="date"
              {...form.register('date')}
              className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {form.formState.errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* Notes Field */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Catatan (Opsional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan atau keterangan tambahan..."
              {...form.register('notes')}
              className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={updateStock.isPending}
          >
            <div className="flex items-center justify-center space-x-2">
              <Save className="w-4 h-4" />
              <span>
                {updateStock.isPending ? 'Menyimpan Data...' : 'Update Stok Sekarang'}
              </span>
            </div>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
