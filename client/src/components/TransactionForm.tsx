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
import { Save } from 'lucide-react';
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
        title: 'Berhasil',
        description: 'Transaksi berhasil disimpan',
      });
      form.reset();
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-main">
          Transaksi Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="type">Jenis Transaksi</Label>
              <Select
                value={form.watch('type')}
                onValueChange={(value) => form.setValue('type', value as 'income' | 'expense')}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih jenis transaksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Pemasukan</SelectItem>
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              placeholder="Contoh: Penjualan roti tawar"
              {...form.register('description')}
              className="mt-1"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Jumlah (Rp)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="25000"
                {...form.register('amount')}
                className="mt-1"
              />
              {form.formState.errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
              <Select
                value={form.watch('paymentMethod')}
                onValueChange={(value) => form.setValue('paymentMethod', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Tunai</SelectItem>
                  <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                  <SelectItem value="e_wallet">E-wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan..."
              {...form.register('notes')}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={createTransaction.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {createTransaction.isPending ? 'Menyimpan...' : 'Simpan Transaksi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
