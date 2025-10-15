import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addTicket, getLatestDraw } from '@/app/[locale]/loto/data/loto';
import { generateId } from '@/lib/utils';

const ticketSchema = z.object({
  numbers: z.array(z.number().min(1).max(49)).length(6),
  amount: z.number().min(100),
  operator: z.enum(['orange', 'airtel', 'vodacom']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ticketSchema.parse(body);

    const latestDraw = getLatestDraw();

    const ticket = addTicket({
      drawId: latestDraw.id,
      numbers: validatedData.numbers,
      amount: validatedData.amount,
    });

    return NextResponse.json({
      ticketId: ticket.id,
      drawId: ticket.drawId,
      status: 'CONFIRMED',
      message: 'Ticket acheté avec succès',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
