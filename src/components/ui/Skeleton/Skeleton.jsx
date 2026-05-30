import { cn } from "@/lib/cn";

const Skeleton = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-xl bg-slate-200", className)} />
  );
};

export default Skeleton;
