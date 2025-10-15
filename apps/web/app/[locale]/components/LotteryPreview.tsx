'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ticket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function LotteryPreview() {
  const t = useTranslations('lottery');

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-12">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    {t('title')}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t('subtitle')}
                  </p>
                  <Button asChild size="lg">
                    <Link href="/loto">
                      {t('buyTicket')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[7, 14, 21, 28, 35, 42].map((num, i) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
