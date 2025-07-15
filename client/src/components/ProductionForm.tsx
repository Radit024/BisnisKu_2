import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const materialSchema = z.object({
  materialName: z.string().min(1, 'Nama bahan harus diisi'),
  quantity: z.string().min(1, 'Jumlah harus diisi'),
  unit: z.string().min(1, 'Satuan harus dipilih'),
});

const productionSchema = z.object({
  date: z.string().min(1, 'Tanggal harus diisi'),
  productName: z.string().min(1, 'Nama produk harus diisi'),
  quantity: z.string().min(1, 'Jumlah produk harus diisi'),
  materials: z.array(materialSchema).min(1, 'Minimal satu bahan harus ditambahkan'),
  notes: z.string().optional(),
});

type ProductionFormData = z.infer<typeof productionSchema>;

export default function ProductionForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      productName: '',
      quantity: '',
      materials: [{ materialName: '', quantity: '', unit: '' }],
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'materials',
  });

  const createProduction = useMutation({
    mutationFn: async (data: ProductionFormData) => {
      const response = await apiRequest('POST', '/api/productions', {
        ...data,
        quantity: parseInt(data.quantity),
        date: new Date(data.date).toISOString(),
        materials: data.materials.map(m => ({
          ...m,
          quantity: parseFloat(m.quantity),
        })),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Produksi berhasil disimpan',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/productions'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Gagal menyimpan produksi',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ProductionFormData) => {
    createProduction.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-main">
          Produksi Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="date">Tanggal Produksi</Label>
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
            <Label htmlFor="productName">Nama Produk</Label>
            <Input
              id="productName"
              placeholder="Contoh: Roti Tawar"
              {...form.register('productName')}
              className="mt-1"
            />
            {form.formState.errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Jumlah Produk Jadi</Label>
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

          <div>
            <Label>Bahan yang Digunakan</Label>
            <div className="space-y-2 mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Input
                    placeholder="Nama bahan"
                    {...form.register(`materials.${index}.materialName`)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    {...form.register(`materials.${index}.quantity`)}
                    className="w-20"
                  />
                  <Select
                    value={form.watch(`materials.${index}.unit`)}
                    onValueChange={(value) => form.setValue(`materials.${index}.unit`, value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="pcs">pcs</SelectItem>
                    </SelectContent>
                  </Select>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => append({ materialName: '', quantity: '', unit: '' })}
              className="mt-2 text-primary hover:text-primary/80"
            >
              <Plus className="w-4 h-4 mr-1" />
              Tambah Bahan
            </Button>
          </div>

          <div>
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              placeholder="Catatan proses produksi..."
              {...form.register('notes')}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={createProduction.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {createProduction.isPending ? 'Menyimpan...' : 'Simpan Produksi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
