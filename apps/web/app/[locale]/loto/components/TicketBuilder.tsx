'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TicketBuilderProps {
  selectedNumbers: number[];
  onNumbersChange: (numbers: number[]) => void;
}

const MAX_NUMBERS = 6;
const MIN_NUMBER = 1;
const MAX_NUMBER = 49;

export function TicketBuilder({ selectedNumbers, onNumbersChange }: TicketBuilderProps) {
  const t = useTranslations('lottery');

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      onNumbersChange(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < MAX_NUMBERS) {
      onNumbersChange([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const clearSelection = () => {
    onNumbersChange([]);
  };

  const numbers = Array.from({ length: MAX_NUMBER }, (_, i) => i + MIN_NUMBER);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('selectNumbers')}</CardTitle>
        <CardDescription>
          Choisissez {MAX_NUMBERS} numéros entre {MIN_NUMBER} et {MAX_NUMBER}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">{t('yourNumbers')}</h4>
            {selectedNumbers.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                <X className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            )}
          </div>
          <div className="flex gap-2 min-h-[60px] p-4 border-2 border-dashed rounded-lg">
            {selectedNumbers.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sélectionnez vos numéros ci-dessous</p>
            ) : (
              selectedNumbers.map((num, index) => (
                <motion.div
                  key={num}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg"
                >
                  {num}
                </motion.div>
              ))
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedNumbers.length} / {MAX_NUMBERS} numéros sélectionnés
          </p>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {numbers.map((num) => {
            const isSelected = selectedNumbers.includes(num);
            const isDisabled = !isSelected && selectedNumbers.length >= MAX_NUMBERS;

            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg font-semibold transition-all
                  ${isSelected ? 'bg-primary text-primary-foreground scale-110 shadow-lg' : 'bg-muted hover:bg-muted/80'}
                  ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {num}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
