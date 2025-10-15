import { NextResponse } from 'next/server';
import { getNumberFrequency } from '@/app/[locale]/loto/data/loto';

export async function GET() {
  const frequency = getNumberFrequency();
  return NextResponse.json(frequency);
}
