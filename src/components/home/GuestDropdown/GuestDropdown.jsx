import { Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

const GuestDropdown = () => {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(2);

  const increaseGuests = () => {
    setGuests((prev) => prev + 1);
  };
  const decreaseGuests = () => {
    if (guests <= 1) return;

    setGuests((prev) => prev - 1);
  };
  return (
    <div className="relative px-4 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1 text-left"
      >
        <span className="text-xs font-medium text-slate-500">Guests</span>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />

          <span className="text-sm font-medium text-slate-800">
            {guests} Guests
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-20 z-50 w-65 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Guests</h4>

              <p className="text-sm text-slate-500">Select guests</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={decreaseGuests}
                className="rounded-full border border-slate-200 p-2"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="font-semibold">{guests}</span>

              <button
                onClick={increaseGuests}
                className="rounded-full border border-slate-200 p-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestDropdown;
