import { NextRequest, NextResponse } from 'next/server';
import { paymentSchema, type PaymentResponse } from '@/lib/payments/mobile';
import { generateId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    const validatedData = paymentSchema.parse(body);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock payment success (90% success rate)
    const isSuccess = Math.random() > 0.1;

    const response: PaymentResponse = {
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      txId: generateId(),
      message: isSuccess
        ? `Paiement de ${validatedData.amount} CDF via ${validatedData.operator} réussi`
        : 'Paiement échoué. Veuillez réessayer.',
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { status: 'FAILED', txId: '', message: 'Invalid request' },
      { status: 400 }
    );
  }
}
