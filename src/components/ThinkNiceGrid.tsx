'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// FlipCard component
interface FlipCardProps {
  imageSrc: string;
  backContent?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ imageSrc, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (backContent && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div 
      className="relative w-full aspect-square cursor-pointer"
      ref={cardRef}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onMouseMove={handleMouseMove}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-face flip-card-front rounded-lg relative">
          <Image
            src={imageSrc}
            alt="Logo"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div 
          className="flip-card-face flip-card-back rounded-lg"
          style={{
            background: backContent 
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4) 0%, transparent 50%), linear-gradient(135deg, #1A0A2E 0%, #553C9A 25%, #7C3AED 50%, #0891B2 75%, #22D3EE 100%)`
              : 'linear-gradient(to bottom right, #1F2937, #000000)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className={`text-white text-center transition-transform duration-300 hover:scale-105 hover:text-pink-300 ${backContent ? "font-['Permanent_Marker'] text-xl animate-glow" : 'text-lg font-bold'}`}>
              {backContent || (
                <>
                  COMING<br />SOON
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// CenterUploadCard component
const CenterUploadCard: React.FC<{ onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; imageSrc: string }> = ({ onUpload, imageSrc }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative col-span-2 row-span-2 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''} h-full`}>
        <div className="flip-card-face flip-card-front rounded-lg relative h-full">
          <Image
            src={imageSrc}
            alt="Random Logo"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flip-card-face flip-card-back rounded-lg h-full">
          <label 
            htmlFor="imageUpload"
            className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xl text-center cursor-pointer hover:from-purple-700 hover:to-pink-600 transition duration-300 ease-in-out"
          >
            Upload Your<br />Awesome Image Here!
          </label>
          <input 
            id="imageUpload"
            type="file" 
            accept="image/*" 
            onChange={onUpload} 
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

// Main grid component
interface GridItem {
  id: number;
  logoNumber: number;
  quote?: string;
}

const ThinkNiceGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [centerLogoNumber, setCenterLogoNumber] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  const totalFlipCards = 20;
  const availableLogos = 17;

  const quotes = [
    "“The Sacred Feminine is the energy within us and in the universe that serves life itself. The qualities of unconditional love, compassion, wisdom, beauty, gentleness, patience, accepting, forgiving, nurturing, welcoming, accessible, kind, intuitive and healing, and so much more, are carried by the Sacred Feminine.” ~ Cindy (Harpe) Hively",
    "“Realize deeply that the present moment is all you ever have. Make the Now the primary focus of your life.” – Eckhart Tolle",
    "“Wisdom is knowing I am nothing, Love is knowing I am everything, and between the two my life moves.” ― Nisargadatta Maharaj"
  ];

  useEffect(() => {
    setIsClient(true);
    const logoNumbers = Array.from({ length: totalFlipCards }, (_, i) => ((i % availableLogos) + 1));
    const shuffledLogos = [...logoNumbers].sort(() => Math.random() - 0.5);
    const items: GridItem[] = shuffledLogos.map((logoNumber, index) => ({
      id: index,
      logoNumber,
    }));

    // Randomly select 3 unique indices for quotes
    const randomIndices: number[] = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * totalFlipCards);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    randomIndices.forEach((index, quoteIndex) => {
      items[index].quote = quotes[quoteIndex];
    });

    setGridItems(items);
    setCenterLogoNumber(Math.floor(Math.random() * availableLogos) + 1);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 lg:p-8">
      <div className="grid grid-cols-4 grid-rows-6 gap-0">
        {/* Row 1: Four flip cards */}
        {gridItems.slice(0, 4).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
            backContent={item.quote}
          />
        ))}
        {/* Row 2: Flip card, center box, flip card */}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[4]?.logoNumber}.png`} 
          backContent={gridItems[4]?.quote}
        />
        {uploadedImage ? (
          <div className="col-span-2 row-span-2 relative rounded-lg shadow-lg">
            <Image 
              src={uploadedImage} 
              alt="Uploaded Logo" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        ) : (
          <CenterUploadCard 
            onUpload={handleImageUpload} 
            imageSrc={`/images/logo-${centerLogoNumber}.png`} 
          />
        )}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[5]?.logoNumber}.png`} 
          backContent={gridItems[5]?.quote}
        />
        {/* Row 3: Flip card, (center spans this area), flip card */}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[6]?.logoNumber}.png`} 
          backContent={gridItems[6]?.quote}
        />
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[7]?.logoNumber}.png`} 
          backContent={gridItems[7]?.quote}
        />
        {/* Row 4: Four flip cards */}
        {gridItems.slice(8, 12).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
            backContent={item.quote}
          />
        ))}
        {/* Row 5: Four flip cards */}
        {gridItems.slice(12, 16).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
            backContent={item.quote}
          />
        ))}
        {/* Row 6: Four flip cards */}
        {gridItems.slice(16, 20).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
            backContent={item.quote}
          />
        ))}
      </div>
    </div>
  );
};

export default ThinkNiceGrid;