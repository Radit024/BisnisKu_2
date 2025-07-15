import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
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
    onError: (error) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-main">
          Update Stok
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="itemName">Nama Barang</Label>
            <Input
              id="itemName"
              placeholder="Contoh: Tepung Terigu"
              {...form.register('itemName')}
              className="mt-1"
            />
            {form.formState.errors.itemName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.itemName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="type">Jenis Barang</Label>
            <Select
              value={form.watch('type')}
              onValueChange={(value) => form.setValue('type', value as 'raw_material' | 'finished_product')}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih jenis barang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="raw_material">Bahan Baku</SelectItem>
                <SelectItem value="finished_product">Produk Jadi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="movementType">Tipe Perubahan</Label>
              <Select
                value={form.watch('movementType')}
                onValueChange={(value) => form.setValue('movementType', value as 'in' | 'out')}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih tipe perubahan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">Stok Masuk</SelectItem>
                  <SelectItem value="out">Stok Keluar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="10"
                {...form.register('quantity')}
                className="mt-1"
              />
              {form.formState.errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Alasan Perubahan</Label>
            <Select
              value={form.watch('reason')}
              onValueChange={(value) => form.setValue('reason', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih alasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Pembelian</SelectItem>
                <SelectItem value="production">Produksi</SelectItem>
                <SelectItem value="sale">Penjualan</SelectItem>
                <SelectItem value="damaged">Rusak</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="date"
              {...form.register('date')}
              className="mt-1"
            />
            {form.formState.errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              placeholder="Catatan tambahan..."
              {...form.register('notes')}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={updateStock.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {updateStock.isPending ? 'Menyimpan...' : 'Update Stok'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
