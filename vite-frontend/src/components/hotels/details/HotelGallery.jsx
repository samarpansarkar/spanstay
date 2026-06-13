import { Image as ImageIcon } from 'lucide-react';

const HotelGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-slate-500">
        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
        <p>No images available for this property.</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group">
        <img
          src={images[0].url}
          alt="Hotel view"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
      <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden h-full">
        <img
          src={images[0].url}
          alt="Main view"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {images.slice(1, 5).map((img, idx) => (
        <div key={idx} className="hidden md:block relative group overflow-hidden h-full">
          <img
            src={img.url}
            alt={`View ${idx + 2}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default HotelGallery;
