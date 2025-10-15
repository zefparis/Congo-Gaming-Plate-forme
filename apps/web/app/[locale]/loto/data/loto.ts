export interface LotoDraw {
  id: string;
  date: string;
  numbers: number[];
  jackpot: number;
}

export interface LotoTicket {
  id: string;
  drawId: string;
  numbers: number[];
  amount: number;
  purchaseDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'WINNER' | 'LOSER';
  matches?: number;
}

// Mock data - in-memory store
const mockDraws: LotoDraw[] = [
  {
    id: 'draw-001',
    date: '2025-10-14T20:00:00Z',
    numbers: [7, 14, 21, 28, 35, 42],
    jackpot: 50000000,
  },
  {
    id: 'draw-002',
    date: '2025-10-07T20:00:00Z',
    numbers: [3, 12, 19, 27, 33, 41],
    jackpot: 45000000,
  },
  {
    id: 'draw-003',
    date: '2025-09-30T20:00:00Z',
    numbers: [5, 11, 18, 24, 31, 47],
    jackpot: 40000000,
  },
];

const mockTickets: LotoTicket[] = [];

export function getDraws(): LotoDraw[] {
  return mockDraws;
}

export function getLatestDraw(): LotoDraw {
  return mockDraws[0];
}

export function getTickets(): LotoTicket[] {
  return mockTickets;
}

export function addTicket(ticket: Omit<LotoTicket, 'id' | 'purchaseDate' | 'status'>): LotoTicket {
  const newTicket: LotoTicket = {
    ...ticket,
    id: `ticket-${Date.now()}`,
    purchaseDate: new Date().toISOString(),
    status: 'CONFIRMED',
  };
  mockTickets.push(newTicket);
  return newTicket;
}

export function calculateMatches(ticketNumbers: number[], drawNumbers: number[]): number {
  return ticketNumbers.filter((num) => drawNumbers.includes(num)).length;
}

export function getNumberFrequency(): Record<number, number> {
  const frequency: Record<number, number> = {};
  mockDraws.forEach((draw) => {
    draw.numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
  });
  return frequency;
}
