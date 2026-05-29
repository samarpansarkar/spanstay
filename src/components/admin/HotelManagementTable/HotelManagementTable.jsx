const hotels = [
  {
    id: 1,
    name: "Luxury Ocean Resort",
    location: "Goa",
    status: "Active",
  },

  {
    id: 2,
    name: "Urban Suites",
    location: "Bangalore",
    status: "Pending",
  },
];

const HotelManagementTable = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hotels</h2>

          <p className="mt-2 text-slate-500">Manage hotel listings</p>
        </div>

        <button className="rounded-xl bg-primary px-5 py-3 text-white">
          Add Hotel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-4">Hotel</th>

              <th className="pb-4">Location</th>

              <th className="pb-4">Status</th>

              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-b border-slate-100">
                <td className="py-5 font-medium">{hotel.name}</td>

                <td className="py-5 text-slate-500">{hotel.location}</td>

                <td className="py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {hotel.status}
                  </span>
                </td>

                <td className="py-5">
                  <button className="text-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelManagementTable;
