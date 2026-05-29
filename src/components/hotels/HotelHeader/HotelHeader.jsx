const HotelHeader = ({ total }) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Available Hotels</h2>

        <p className="text-slate-500">{total} hotels found</p>
      </div>

      <input
        type="text"
        placeholder="Search hotels..."
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-primary lg:w-[350px]"
      />

      <select className="rounded-xl border border-slate-200 px-4 py-3 outline-none">
        <option>Recommended</option>

        <option>Price Low to High</option>

        <option>Price High to Low</option>

        <option>Top Rated</option>
      </select>
    </div>
  );
};

export default HotelHeader;
