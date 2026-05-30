import { cn } from "@/lib/cn";

const SearchField = ({ icon, label, value, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-r border-slate-200 px-4 py-2",
        className,
      )}
    >
      <span className="text-xs font-medium text-slate-500">{label}</span>

      <div className="flex items-center gap-2">
        {icon}

        <span className="text-sm font-medium text-slate-800">{value}</span>
      </div>
    </div>
  );
};

export default SearchField;
