'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const operators = [
  { name: 'Orange Money', color: 'bg-orange-500', icon: '🟠' },
  { name: 'Airtel Money', color: 'bg-red-500', icon: '🔴' },
  { name: 'M-Pesa', color: 'bg-green-500', icon: '🟢' },
];

const steps = ['1', '2', '3'];

export function PaymentsSection() {
  const t = useTranslations('payments');

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-6">Opérateurs supportés</h3>
            <div className="space-y-4">
              {operators.map((operator, index) => (
                <motion.div
                  key={operator.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`h-12 w-12 rounded-full ${operator.color} flex items-center justify-center text-2xl`}>
                        {operator.icon}
                      </div>
                      <span className="font-medium">{operator.name}</span>
                      <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Comment ça marche ?</h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {step}
                  </div>
                  <div className="pt-1">
                    <p className="font-medium">{t(`steps.${step}`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
