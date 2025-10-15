'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';
import { mobileOperators, operatorConfig, type MobileOperator } from '@/lib/payments/mobile';
import { Loader2 } from 'lucide-react';

interface PurchasePanelProps {
  selectedNumbers: number[];
  onPurchaseComplete: () => void;
}

const TICKET_PRICE = 1000; // CDF

export function PurchasePanel({ selectedNumbers, onPurchaseComplete }: PurchasePanelProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const [operator, setOperator] = useState<MobileOperator>('orange');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!phone) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer votre numéro de téléphone',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Mock payment
      const paymentResponse = await fetch('/api/payments/mobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: TICKET_PRICE,
          operator,
          phone,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.status === 'SUCCESS') {
        // Purchase ticket
        const ticketResponse = await fetch('/api/loto/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            numbers: selectedNumbers,
            amount: TICKET_PRICE,
            operator,
          }),
        });

        const ticketData = await ticketResponse.json();

        toast({
          title: '✅ Ticket acheté !',
          description: `Ticket #${ticketData.ticketId} confirmé. Bonne chance !`,
        });

        onPurchaseComplete();
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'achat',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle>{t('lottery.confirmPurchase')}</CardTitle>
        <CardDescription>
          Prix du ticket: {formatCurrency(TICKET_PRICE)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Vos numéros:</p>
          <div className="flex gap-2">
            {selectedNumbers.map((num) => (
              <div
                key={num}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('payments.operator')}</label>
          <Select value={operator} onValueChange={(v) => setOperator(v as MobileOperator)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mobileOperators.map((op) => (
                <SelectItem key={op} value={op}>
                  {operatorConfig[op].icon} {operatorConfig[op].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('payments.phone')}</label>
          <Input
            type="tel"
            placeholder="+243 XXX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePurchase} disabled={loading} className="w-full" size="lg">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Payer {formatCurrency(TICKET_PRICE)}
        </Button>
      </CardFooter>
    </Card>
  );
}
