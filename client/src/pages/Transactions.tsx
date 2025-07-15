import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import TransactionForm from '@/components/TransactionForm';

export default function Transactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
  });

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Penjualan</h2>
        <p className="text-gray-600">Catat semua penjualan dan pengeluaran bisnis Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction Form */}
        <TransactionForm />

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-text-main">
                Riwayat Transaksi
              </CardTitle>
              <Button className="bg-accent hover:bg-accent/90">
                <FileText className="w-4 h-4 mr-2" />
                Ekspor PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
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
                {transactions?.map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-text-main">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString('id-ID')} • {' '}
                        {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                         transaction.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : 'E-wallet'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'income' ? 'text-success' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </p>
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </Badge>
                    </div>
                  </div>
                ))}
                {!transactions?.length && (
                  <p className="text-gray-500 text-center py-8">
                    Belum ada transaksi. Mulai catat penjualan pertama Anda!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
