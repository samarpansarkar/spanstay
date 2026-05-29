const HotelFilters = () => {
  return (
    <div className="sticky top-28 space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Price Range</h3>

        <input type="range" min="1000" max="10000" className="w-full" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ratings</h3>

        <div className="space-y-3">
          {[5, 4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-3">
              <input type="checkbox" />

              <span>{rating} Stars & Above</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;
