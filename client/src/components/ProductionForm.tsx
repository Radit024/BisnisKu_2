import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Plus, 
  Trash2, 
  Factory, 
  Calendar, 
  Package, 
  FlaskConical, 
  Target, 
  ClipboardList, 
  Beaker
} from 'lucide-react';
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
    onError: () => {
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
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-orange-50">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white pb-6">
        <CardTitle className="text-xl font-bold flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <span className="block">Produksi Baru</span>
            <span className="text-sm font-normal text-orange-100 block">Catat proses pembuatan produk</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Date and Product Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Tanggal Produksi
              </Label>
              <Input
                id="date"
                type="date"
                {...form.register('date')}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              {form.formState.errors.date && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700 flex items-center">
                <Target className="w-4 h-4 mr-2 text-gray-500" />
                Jumlah Produk Jadi
              </Label>
              <div className="relative">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="10"
                  {...form.register('quantity')}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-semibold text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  Unit
                </span>
              </div>
              {form.formState.errors.quantity && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-sm font-semibold text-gray-700 flex items-center">
              <Package className="w-4 h-4 mr-2 text-gray-500" />
              Nama Produk
            </Label>
            <Input
              id="productName"
              placeholder="Contoh: Roti Tawar, Kue Bolu, Martabak Manis..."
              {...form.register('productName')}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            {form.formState.errors.productName && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {form.formState.errors.productName.message}
              </p>
            )}
          </div>

          {/* Materials Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700 flex items-center">
                <FlaskConical className="w-4 h-4 mr-2 text-gray-500" />
                Bahan yang Digunakan
              </Label>
              <Badge className="bg-orange-100 text-orange-800 text-xs">
                {fields.length} Bahan
              </Badge>
            </div>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-orange-100 p-1 rounded-lg">
                      <Beaker className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Bahan #{index + 1}</span>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="ml-auto text-red-600 hover:text-red-800 hover:bg-red-50 h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Nama bahan (contoh: Tepung terigu, Gula pasir...)"
                        {...form.register(`materials.${index}.materialName`)}
                        className="border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Jumlah"
                        {...form.register(`materials.${index}.quantity`)}
                        className="border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all"
                      />
                      <Select
                        value={form.watch(`materials.${index}.unit`)}
                        onValueChange={(value) => form.setValue(`materials.${index}.unit`, value)}
                      >
                        <SelectTrigger className="border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all bg-white">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-xl">
                          <SelectItem value="kg" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">kg</span>
                              <span className="text-xs text-gray-500 ml-2">Kilogram</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="g" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">g</span>
                              <span className="text-xs text-gray-500 ml-2">Gram</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="l" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">l</span>
                              <span className="text-xs text-gray-500 ml-2">Liter</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="ml" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">ml</span>
                              <span className="text-xs text-gray-500 ml-2">Mililiter</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="pcs" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">pcs</span>
                              <span className="text-xs text-gray-500 ml-2">Pieces</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sdm" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">sdm</span>
                              <span className="text-xs text-gray-500 ml-2">Sendok Makan</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sdt" className="rounded-lg py-2 hover:bg-orange-50">
                            <div className="flex items-center">
                              <span className="font-medium">sdt</span>
                              <span className="text-xs text-gray-500 ml-2">Sendok Teh</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Show errors for this material */}
                  {form.formState.errors.materials?.[index] && (
                    <div className="mt-2 space-y-1">
                      {form.formState.errors.materials[index]?.materialName && (
                        <p className="text-red-500 text-xs">• {form.formState.errors.materials[index]?.materialName?.message}</p>
                      )}
                      {form.formState.errors.materials[index]?.quantity && (
                        <p className="text-red-500 text-xs">• {form.formState.errors.materials[index]?.quantity?.message}</p>
                      )}
                      {form.formState.errors.materials[index]?.unit && (
                        <p className="text-red-500 text-xs">• {form.formState.errors.materials[index]?.unit?.message}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ materialName: '', quantity: '', unit: '' })}
              className="w-full border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all py-3 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Bahan Lainnya
            </Button>
            
            {form.formState.errors.materials && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {form.formState.errors.materials.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 flex items-center">
              <ClipboardList className="w-4 h-4 mr-2 text-gray-500" />
              Catatan Produksi (Opsional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan tentang proses produksi, kendala yang dihadapi, atau tips untuk batch selanjutnya..."
              {...form.register('notes')}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:shadow-xl hover:scale-105 active:scale-95"
            disabled={createProduction.isPending}
          >
            {createProduction.isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan Produksi...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Simpan Catatan Produksi</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
