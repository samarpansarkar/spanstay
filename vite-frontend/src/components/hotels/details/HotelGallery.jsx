import { Image as ImageIcon } from 'lucide-react';

const HotelGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-surface-container-lowest border border-glass-border rounded-sm flex flex-col items-center justify-center text-on-surface-variant">
        <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
        <p className="font-body text-sm uppercase tracking-wider">No images available</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden relative group">
        <img
          src={images[0].url}
          alt="Hotel view"
          fetchPriority="high"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight-navy/80 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 h-[400px] md:h-[500px] rounded-sm overflow-hidden">
      <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden h-full">
        <img
          src={images[0].url}
          alt="Main view"
          fetchPriority="high"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      {images.slice(1, 5).map((img, idx) => (
        <div key={idx} className="hidden md:block relative group overflow-hidden h-full">
          <img
            src={img.url}
            alt={`View ${idx + 2}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default HotelGallery;
