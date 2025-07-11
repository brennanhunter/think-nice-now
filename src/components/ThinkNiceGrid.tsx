'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// FlipCard component with TypeScript props
interface FlipCardProps {
  logoNumber: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ logoNumber }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-face flip-card-front rounded-lg relative">
          <Image
            src={`/images/logo-${logoNumber}.png`}
            alt={`Think Nice Now Logo ${logoNumber}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flip-card-face flip-card-back bg-black rounded-lg">
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-white text-lg font-bold text-center">
              COMING<br />SOON
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid item interface
interface GridItem {
  id: number;
  logoNumber: number;
}

const ThinkNiceGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  const totalFlipCards = 20; // Total number of cards in the grid
  const availableLogos = 17; // Number of available logos

  useEffect(() => {
    setIsClient(true);

    // Generate logo numbers cycling through 1 to 17 for all 20 cards
    const logoNumbers = Array.from({ length: totalFlipCards }, (_, i) => ((i % availableLogos) + 1));
    const shuffledLogos = [...logoNumbers].sort(() => Math.random() - 0.5);

    // Create grid items
    const items: GridItem[] = shuffledLogos.map((logoNumber, index) => ({
      id: index,
      logoNumber,
    }));

    setGridItems(items);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="grid grid-cols-4 grid-rows-6 gap-4 lg:gap-6">
        {/* Row 1: Four flip cards */}
        {gridItems.slice(0, 4).map((item) => (
          <FlipCard key={item.id} logoNumber={item.logoNumber} />
        ))}

        {/* Row 2: Flip card, large center square, flip card */}
        <FlipCard logoNumber={gridItems[4]?.logoNumber} />
        <div className="col-span-2 row-span-2 bg-white rounded-lg flex items-center justify-center p-4 shadow-lg">
          <div className="text-center">
            <div className="text-lg sm:text-2xl lg:text-4xl font-black text-black leading-tight">
              THINK<br />NICE
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-normal text-black mt-1">
              now
            </div>
          </div>
        </div>
        <FlipCard logoNumber={gridItems[5]?.logoNumber} />

        {/* Row 3: Flip card, (center spans this area), flip card */}
        <FlipCard logoNumber={gridItems[6]?.logoNumber} />
        <FlipCard logoNumber={gridItems[7]?.logoNumber} />

        {/* Row 4: Four flip cards */}
        {gridItems.slice(8, 12).map((item) => (
          <FlipCard key={item.id} logoNumber={item.logoNumber} />
        ))}

        {/* Row 5: Four flip cards */}
        {gridItems.slice(12, 16).map((item) => (
          <FlipCard key={item.id} logoNumber={item.logoNumber} />
        ))}

        {/* Row 6: Four flip cards */}
        {gridItems.slice(16, 20).map((item) => (
          <FlipCard key={item.id} logoNumber={item.logoNumber} />
        ))}
      </div>
    </div>
  );
};

export default ThinkNiceGrid;