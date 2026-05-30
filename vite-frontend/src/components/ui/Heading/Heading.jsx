import { cn } from "@/lib/cn";

const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={cn("space-y-4", center && "text-center")}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h2>

      {subtitle && <p className="text-slate-600 max-w-2xl">{subtitle}</p>}
    </div>
  );
};

export default Heading;
