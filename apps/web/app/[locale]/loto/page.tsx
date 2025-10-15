'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TicketBuilder } from './components/TicketBuilder';
import { DrawResults } from './components/DrawResults';
import { PurchasePanel } from './components/PurchasePanel';
import { Card } from '@/components/ui/card';

export default function LotoPage() {
  const t = useTranslations('lottery');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showPurchase, setShowPurchase] = useState(false);

  const handleNumbersSelected = (numbers: number[]) => {
    setSelectedNumbers(numbers);
    if (numbers.length === 6) {
      setShowPurchase(true);
    }
  };

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div>
            <TicketBuilder
              selectedNumbers={selectedNumbers}
              onNumbersChange={handleNumbersSelected}
            />
          </div>
          <div>
            {showPurchase && selectedNumbers.length === 6 && (
              <PurchasePanel
                selectedNumbers={selectedNumbers}
                onPurchaseComplete={() => {
                  setSelectedNumbers([]);
                  setShowPurchase(false);
                }}
              />
            )}
          </div>
        </div>

        <DrawResults />
      </div>
    </div>
  );
}
