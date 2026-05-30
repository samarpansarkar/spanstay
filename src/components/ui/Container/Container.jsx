import { cn } from "@/lib/cn";

const Container = ({ children, className }) => {
  return (
    <section
      className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg-px08", className)}
    >
      {children}
    </section>
  );
};

export default Container;
