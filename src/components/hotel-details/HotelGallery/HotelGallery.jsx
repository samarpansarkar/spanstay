import Image from "next/image";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
];

const HotelGallery = ({ images }) => {
  const displayImages =
    Array.isArray(images) && images.length > 0 ? images : FALLBACK_IMAGES;

  const mainImage = displayImages[0];
  const sideImages = displayImages.slice(1, 3);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="relative h-[360px] overflow-hidden rounded-3xl lg:h-[480px]">
        <Image
          src={mainImage}
          alt="Hotel main view"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {sideImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {sideImages.map((image, i) => (
            <div
              key={i}
              className="relative h-[160px] overflow-hidden rounded-3xl lg:h-[232px]"
            >
              <Image
                src={image}
                alt={`Hotel view ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelGallery;

