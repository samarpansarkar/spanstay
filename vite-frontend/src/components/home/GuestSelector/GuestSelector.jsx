import { Users } from "lucide-react";

const GuestSelector = () => {
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <span className="text-xs font-medium text-slate-500">Guests</span>

      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />

        <span className="text-sm font-medium text-slate-800">2 Guests</span>
      </div>
    </div>
  );
};

export default GuestSelector;
