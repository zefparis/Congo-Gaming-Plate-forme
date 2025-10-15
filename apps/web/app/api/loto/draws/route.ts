import { NextResponse } from 'next/server';
import { getDraws } from '@/app/[locale]/loto/data/loto';

export async function GET() {
  const draws = getDraws();
  return NextResponse.json(draws);
}
