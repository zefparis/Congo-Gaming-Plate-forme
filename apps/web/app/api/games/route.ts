import { NextResponse } from 'next/server';
import { GAMES } from '@/app/[locale]/jeux/data/games';

export async function GET() {
  return NextResponse.json(GAMES);
}
