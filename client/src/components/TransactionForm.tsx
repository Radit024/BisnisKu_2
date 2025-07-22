import { useState } from 'react';
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
  Calendar, 
  DollarSign, 
  FileText, 
  CreditCard, 
  Banknote, 
  Smartphone,
  TrendingUp,
  TrendingDown,
  Receipt
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
    onError: (error) => {
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
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-6">
        <CardTitle className="text-xl font-bold flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <span className="block">Transaksi Baru</span>
            <span className="text-sm font-normal text-blue-100 block">Catat pemasukan & pengeluaran bisnis</span>
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
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                watchedType === 'income'
                  ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className={`w-5 h-5 ${watchedType === 'income' ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`font-semibold ${watchedType === 'income' ? 'text-green-700' : 'text-gray-600'}`}>
                  Pemasukan
                </span>
              </div>
              {watchedType === 'income' && (
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2"></div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => form.setValue('type', 'expense')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                watchedType === 'expense'
                  ? 'border-red-500 bg-red-50 shadow-lg shadow-red-100'
                  : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingDown className={`w-5 h-5 ${watchedType === 'expense' ? 'text-red-600' : 'text-gray-400'}`} />
                <span className={`font-semibold ${watchedType === 'expense' ? 'text-red-700' : 'text-gray-600'}`}>
                  Pengeluaran
                </span>
              </div>
              {watchedType === 'expense' && (
                <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-2"></div>
              )}
            </button>
          </div>

          {/* Date and Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Tanggal
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  {...form.register('date')}
                  className="pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              {form.formState.errors.date && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                Jumlah (Rp)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  Rp
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  {...form.register('amount')}
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-lg"
                />
              </div>
              {form.formState.errors.amount && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Deskripsi
            </Label>
            <Input
              id="description"
              placeholder="Contoh: Penjualan roti tawar, Pembelian bahan baku..."
              {...form.register('description')}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700 flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
              Metode Pembayaran
            </Label>
            <Select
              value={form.watch('paymentMethod')}
              onValueChange={(value) => form.setValue('paymentMethod', value)}
            >
              <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all h-auto bg-white">
                <div className="flex items-center">
                  {watchedPaymentMethod && getPaymentMethodIcon(watchedPaymentMethod)}
                  <SelectValue placeholder="Pilih metode pembayaran" className="ml-2" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-xl backdrop-blur-none">
                <SelectItem value="cash" className="rounded-lg py-3 hover:bg-green-50 focus:bg-green-50 bg-white">
                  <div className="flex items-center space-x-3">
                    <Banknote className="w-4 h-4 text-green-600" />
                    <div>
                      <span className="font-medium text-gray-900">Tunai</span>
                      <span className="text-xs text-gray-600 block">Cash payment</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="bank_transfer" className="rounded-lg py-3 hover:bg-blue-50 focus:bg-blue-50 bg-white">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-medium text-gray-900">Transfer Bank</span>
                      <span className="text-xs text-gray-600 block">Bank transfer</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="e_wallet" className="rounded-lg py-3 hover:bg-purple-50 focus:bg-purple-50 bg-white">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="font-medium text-gray-900">E-wallet</span>
                      <span className="text-xs text-gray-600 block">Digital wallet</span>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 flex items-center">
              <Receipt className="w-4 h-4 mr-2 text-gray-500" />
              Catatan (Opsional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan tambahan untuk transaksi ini..."
              {...form.register('notes')}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg ${
              watchedType === 'income'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-200'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-200'
            } text-white hover:shadow-xl hover:scale-105 active:scale-95`}
            disabled={createTransaction.isPending}
          >
            {createTransaction.isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Save className="w-5 h-5" />
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
