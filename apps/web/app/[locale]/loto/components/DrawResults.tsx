'use client';

import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { LotoDraw } from '../data/loto';

export function DrawResults() {
  const t = useTranslations('lottery');

  const { data: draws } = useQuery<LotoDraw[]>({
    queryKey: ['loto-draws'],
    queryFn: async () => {
      const response = await fetch('/api/loto/draws');
      return response.json();
    },
  });

  const { data: frequency } = useQuery<Record<string, number>>({
    queryKey: ['loto-frequency'],
    queryFn: async () => {
      const response = await fetch('/api/loto/frequency');
      return response.json();
    },
  });

  const chartData = frequency
    ? Object.entries(frequency)
        .map(([num, count]) => ({ number: num, count }))
        .sort((a, b) => parseInt(a.number) - parseInt(b.number))
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">{t('drawResults')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {draws?.map((draw, index) => (
            <Card key={draw.id} className={index === 0 ? 'border-2 border-primary' : ''}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {index === 0 ? t('lastDraw') : `Tirage ${new Date(draw.date).toLocaleDateString('fr-FR')}`}
                </CardTitle>
                <CardDescription>
                  Jackpot: {formatCurrency(draw.jackpot)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {draw.numbers.map((num) => (
                    <div
                      key={num}
                      className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {new Date(draw.date).toLocaleString('fr-FR')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('frequency')}</CardTitle>
            <CardDescription>
              Fréquence d'apparition des numéros sur les derniers tirages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="number" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
