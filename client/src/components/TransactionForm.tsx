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
  Plus, 
  CreditCard, 
  Banknote, 
  Smartphone,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const transactionSchema = z.object({
  date: z.string().min(1, 'Tanggal harus diisi'),
  type: z.enum(['income', 'expense']),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  amount: z.string().min(1, 'Jumlah harus diisi'),
  paymentMethod: z.string().min(1, 'Metode pembayaran harus dipilih'),
  notes: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      description: '',
      amount: '',
      paymentMethod: '',
      notes: '',
    },
  });

  const createTransaction = useMutation({
    mutationFn: async (data: TransactionFormData) => {
      const response = await apiRequest('POST', '/api/transactions', {
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date).toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Berhasil! 🎉',
        description: 'Transaksi berhasil disimpan',
      });
      form.reset({
        date: new Date().toISOString().split('T')[0],
        type: 'income',
        description: '',
        amount: '',
        paymentMethod: '',
        notes: '',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Gagal menyimpan transaksi',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    createTransaction.mutate(data);
  };

  const watchedType = form.watch('type');
  const watchedPaymentMethod = form.watch('paymentMethod');

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <Banknote className="w-4 h-4 text-green-600" />;
      case 'bank_transfer':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'e_wallet':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          <div>
            <span className="block">Transaksi Baru</span>
            <span className="text-sm font-normal text-blue-100">Catat pemasukan & pengeluaran bisnis</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Transaction Type Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => form.setValue('type', 'income')}
              className={`p-3 rounded-lg border transition-colors ${
                watchedType === 'income'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className={`w-4 h-4 ${watchedType === 'income' ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="font-medium">Pemasukan</span>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => form.setValue('type', 'expense')}
              className={`p-3 rounded-lg border transition-colors ${
                watchedType === 'expense'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingDown className={`w-4 h-4 ${watchedType === 'expense' ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="font-medium">Pengeluaran</span>
              </div>
            </button>
          </div>

          {/* Date and Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Tanggal
              </Label>
              <Input
                id="date"
                type="date"
                {...form.register('date')}
                className="border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {form.formState.errors.date && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Jumlah (Rp)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rp
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  {...form.register('amount')}
                  className="pl-10 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {form.formState.errors.amount && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Deskripsi
            </Label>
            <Input
              id="description"
              placeholder="Contoh: Penjualan roti tawar, Pembelian bahan baku..."
              {...form.register('description')}
              className="border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
              Metode Pembayaran
            </Label>
            <Select
              value={form.watch('paymentMethod')}
              onValueChange={(value) => form.setValue('paymentMethod', value)}
            >
              <SelectTrigger className="border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <div className="flex items-center">
                  {watchedPaymentMethod && getPaymentMethodIcon(watchedPaymentMethod)}
                  <SelectValue placeholder="Pilih metode pembayaran" className="ml-2" />
                </div>
              </SelectTrigger>
              <SelectContent className="border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="cash" className="hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Banknote className="w-4 h-4 text-green-600" />
                    <span>Tunai</span>
                  </div>
                </SelectItem>
                <SelectItem value="bank_transfer" className="hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Transfer Bank</span>
                  </div>
                </SelectItem>
                <SelectItem value="e_wallet" className="hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>E-wallet</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Catatan (Opsional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan tambahan untuk transaksi ini..."
              {...form.register('notes')}
              className="border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className={`w-full font-medium transition-colors ${
              watchedType === 'income'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            disabled={createTransaction.isPending}
          >
            {createTransaction.isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" />
                <span>
                  {watchedType === 'income' ? 'Simpan Pemasukan' : 'Simpan Pengeluaran'}
                </span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
