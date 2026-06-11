import { cn } from '@/lib/cn';

const Card = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
