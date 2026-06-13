import { cn } from '@/lib/cn';

const Section = ({ children, className }) => {
  return <section className={cn('py-20', className)}>{children}</section>;
};

export default Section;
