'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// FlipCard component
interface FlipCardProps {
  imageSrc: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ imageSrc }) => {
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
            src={imageSrc}
            alt="Logo"
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

// Main grid component
interface GridItem {
  id: number;
  logoNumber: number;
}

const ThinkNiceGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const totalFlipCards = 20;
  const availableLogos = 17;

  useEffect(() => {
    setIsClient(true);
    const logoNumbers = Array.from({ length: totalFlipCards }, (_, i) => ((i % availableLogos) + 1));
    const shuffledLogos = [...logoNumbers].sort(() => Math.random() - 0.5);
    const items = shuffledLogos.map((logoNumber, index) => ({
      id: index,
      logoNumber,
    }));
    setGridItems(items);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage); // Clean up previous URL to prevent memory leaks
      }
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="text-sm text-gray-700"
        />
      </div>
      <div className="grid grid-cols-4 grid-rows-6 gap-4 lg:gap-6">
        {/* Row 1: Four flip cards */}
        {gridItems.slice(0, 4).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
          />
        ))}
        {/* Row 2: Flip card, center box, flip card */}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[4]?.logoNumber}.png`} 
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
        )}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[5]?.logoNumber}.png`} 
        />
        {/* Row 3: Flip card, (center spans this area), flip card */}
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[6]?.logoNumber}.png`} 
        />
        <FlipCard 
          imageSrc={uploadedImage || `/images/logo-${gridItems[7]?.logoNumber}.png`} 
        />
        {/* Row 4: Four flip cards */}
        {gridItems.slice(8, 12).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
          />
        ))}
        {/* Row 5: Four flip cards */}
        {gridItems.slice(12, 16).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
          />
        ))}
        {/* Row 6: Four flip cards */}
        {gridItems.slice(16, 20).map((item) => (
          <FlipCard 
            key={item.id} 
            imageSrc={uploadedImage || `/images/logo-${item.logoNumber}.png`} 
          />
        ))}
      </div>
    </div>
  );
};

export default ThinkNiceGrid;