import Button from "@/components/ui/Button";

const BookingCard = () => {
  return (
    <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="space-y-6">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold">₹4200</span>

            <span className="pb-1 text-slate-500">/night</span>
          </div>

          <p className="mt-2 text-sm text-slate-500">Includes taxes & fees</p>
        </div>

        <div className="space-y-4">
          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
          />

          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
          />

          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none">
            <option>2 Guests</option>

            <option>4 Guests</option>
          </select>
        </div>

        <Button size="lg" className="w-full">
          Reserve Now
        </Button>

        <p className="text-center text-sm text-slate-500">
          You won’t be charged yet
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
