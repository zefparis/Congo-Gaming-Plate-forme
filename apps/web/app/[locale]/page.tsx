import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { GamesPreview } from './components/GamesPreview';
import { LotteryPreview } from './components/LotteryPreview';
import { PaymentsSection } from './components/PaymentsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <GamesPreview />
      <PaymentsSection />
      <LotteryPreview />
    </div>
  );
}
