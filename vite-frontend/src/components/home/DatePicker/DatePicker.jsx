import { Calendar } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

const DatePicker = ({ label }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <div className="relative border-r border-slate-200 px-4 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1 text-left"
      >
        <span className="text-xs font-medium text-slate-500">{label}</span>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />

          <span className="text-sm font-medium text-slate-800">
            {date.toDateString()}
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute left-0 top-20 z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selected) => {
              if (!selected) return;

              setDate(selected);

              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
