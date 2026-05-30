const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
];

const HotelGallery = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="overflow-hidden rounded-3xl">
        <img
          src={images[0]}
          alt="Hotel"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {images.slice(1).map((image) => (
          <div key={image} className="overflow-hidden rounded-3xl">
            <img
              src={image}
              alt="Hotel"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelGallery;
